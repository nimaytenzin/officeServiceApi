import { Injectable, Inject } from '@nestjs/common';
import { Booking } from './booking.entity';
import { BOOKING_REPOSITORY } from '../../core/constants'
import { BookingWithSeatsDto } from './dto/bookingwithSeats.dto'
import { BookedSeatsDto } from '../booked-seats/dto/bookedSeat.dto'
import sequelize from 'sequelize';
import { BookedSeatsService } from '../booked-seats/booked-seats.service'
import { BankDetailsService } from '../bank-details/bank-details.service'
import { SchedulesService } from '../schedules/schedules.service';
import * as crypto from 'crypto'
import * as moment from 'moment';
import * as fs from 'fs'
import * as path from 'path'
import { Schedule } from '../schedules/schedule.entity';
import { BookedSeat } from '../booked-seats/booked-seats.entity';
import { Model } from 'sequelize';
import { Route } from '../routes/route.entity';
import { all } from 'sequelize/types/lib/operators';
import { Stop } from '../stops/stop.entity';
import { CalendarDate } from '../calendar-dates/calendar-dates.entity';
@Injectable()
export class BookingsService {
    constructor(@Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking, private bookedSeatServices: BookedSeatsService,
        private bankDetailsService: BankDetailsService) { }

    async create(bookingwithSeats: BookingWithSeatsDto): Promise<Booking> {

        var newBooking = await this.bookingRepository.create<Booking>(bookingwithSeats.booking, {
            include: [{
                model: Schedule
            }]
        });
        let bookingId = newBooking.id;


        for (let i = 0; i < bookingwithSeats.seats.length; i++) {
            let newSeat: BookedSeatsDto = {
                bookingId: bookingId,
                scheduleId: bookingwithSeats.booking.scheduleId,
                seatNumber: bookingwithSeats.seats[i]
            }
            await this.bookedSeatServices.create(newSeat)
        }

        var bookedSeats = await this.bookedSeatServices.findAllByBookingId(bookingId)
        var seats = []
        bookedSeats.forEach(ele => {
            seats.push(ele.seatNumber.toString())
        })


        console.log("BOOKING", newBooking)

        let booking = await this.findOneById(bookingId)
        console.log("BOOKING", booking)


        //var for checksum
        
        var departureTime = getdepTime(booking.schedule.route.departureTime)
        var origin = booking.schedule.route.origin.name
        var destination = booking.schedule.route.destination.name
        var seatString = seats.join(',');

        var departureDate = `${booking.schedule.calendarDate.Day_Name} ${booking.schedule.calendarDate.Calendar_Day} ${booking.schedule.calendarDate.Month_Name} ${booking.schedule.calendarDate.Calendar_Year}`



        function getdepTime (time) {
            let tissme = time.split(":");
            let hrs = parseInt(tissme[0]);
            let min = parseInt(tissme[1]).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            });
            let ampm = "am";
            if (hrs > 12) {
              hrs = hrs - 12;
              ampm = "pm";
            }
      
            return `${hrs}:${min} ${ampm}`;
          }




        var checksumText = `${seatString}|${departureDate}|${departureTime}|${origin}|${destination}|${newBooking.customerName}|${newBooking.customerContact}`

        var ok = Buffer.from(checksumText).toString('base64')
        // console.log("base 64", ok)
        // // var checksumText = `Thimphu|Chukha|August 20, 2021|07:00:AM|Nima Yoezer|17263764|1,2,5,6`
        // console.log(checksumText, "QR DATA")
        // var secretText = "geospatialBhutan";
        // var cipher = crypto.createCipheriv('rc4', secretText, '');
        // var ciphertext = cipher.update(checksumText, 'utf8', 'base64');
        // console.log("Ciphertext:\t", ciphertext);

        await this.update(newBooking.id, {
            checkSum: ok
        })
        return newBooking
    }

    async generateChecksum(bookingId: number) {
        let booking = await this.findOneById(bookingId)
        let benBankDetails = await this.bankDetailsService.findFirst()


        var keyPath = path.resolve(__dirname, '../../../src/core/constants/metoPrivateKey.key');
        var privateKey = fs.readFileSync(keyPath, 'utf8');

        let bfsTxnTime = moment().format('YYYYMMDDhhmmss'); // August 19th 2021, 12:54:01 pm
        let data = `${benBankDetails.bfs_benfBankCode}|${benBankDetails.bfs_benfId}|${booking.id}|${bfsTxnTime}|AR|SeatBooking|customer@gmail.com|${booking.amount}|${benBankDetails.bfs_txnCurrency}|1.0`
        const encryptedData = crypto.publicEncrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha1",
            },
            Buffer.from(data)
        );

        let checksum = encryptedData.toString('hex')

        return { checksum, booking, bfsTxnTime, benBankDetails }
    }

    async findOneById(id: number): Promise<Booking> {
        return await this.bookingRepository.findOne<Booking>({
            where: { id },
            include: [{
                model: Schedule,
                include: [
                    {
                        model: Route,
                        include: [
                            {
                                model: Stop,
                                as: 'destination'
                            },
                            {
                                model: Stop,
                                as: 'origin'
                            }
                        ]
                    },
                    {
                        model:CalendarDate
                    }
                ]

            }, {
                model: BookedSeat
            },
        
        ]
        });
    }


    async findOneByDate(date: string): Promise<Booking[]> {
        return await this.bookingRepository.findAll<Booking>({
            where: sequelize.where(
                sequelize.fn('date', sequelize.col('bookingTime')),
                "=",
                date
            )
        })
    }


    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.findAll<Booking>()
    }


    async findAllCancelled(): Promise<Booking[]> {
        return this.bookingRepository.findAll<Booking>({
            where: {
                checkInStatus: 'CANCELLED'
            },
            include: [{
                all: true,
                nested: true
            }]
        });
    }

    async update(id, data) {
        const [numRows, num] = await this.bookingRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );

        let ok = await this.bookedSeatServices.findAllByBookingId(id)
        console.log(ok)
        ok.forEach(ele => {
            this.bookedSeatServices.update(ele.id, data)
        })
        return { numRows, num }
    }

    async transferBooking(id, data) {
        const [numRows, num] = await this.bookingRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        console.log("ok \n")
        console.log(num)
        return { numRows, num }
    }

    async cancelBooking(id, data) {
        const [numRows, num] = await this.bookingRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        await this.bookedSeatServices.deleteAllByBookingId(id)
        return { numRows, num }
    }

    async delete(id) {
        return await this.bookingRepository.destroy({ where: { id } });
    }
}
