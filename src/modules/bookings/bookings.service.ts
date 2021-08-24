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
@Injectable()
export class BookingsService {
    constructor(@Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking, private bookedSeatServices: BookedSeatsService, 
    private bankDetailsService: BankDetailsService) { }

    async create(bookingwithSeats: BookingWithSeatsDto): Promise<Booking> {

        var newBooking = await this.bookingRepository.create<Booking>(bookingwithSeats.booking,{
            include: [{
                model: Schedule
              }]
        });
        let bookingId = newBooking.id;

   
        for(let i =0; i<bookingwithSeats.seats.length;i++){
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
        
        //var for checksum
        var departureDate = moment(newBooking.bookingTime).format('LL')
        var departureTime = "07:00:AM"
        var origin = "Thimphu"
        var destination = "Gasa"
        var seatString = seats.join(',');



        var checksumText = `${departureDate}|${departureTime}|${origin}|${destination}|${newBooking.customerName}|${newBooking.customerContact}|${seatString}`
        // var checksumText = `Thimphu|Chukha|August 20, 2021|07:00:AM|Nima Yoezer|17263764|1,2,5,6`
        console.log(checksumText, "QR DATA")
        var secretText = "geospatialBhutan";
        var cipher = crypto.createCipheriv('rc4', secretText, '');
        var ciphertext = cipher.update(checksumText, 'utf8', 'hex');
        console.log("Ciphertext:\t", ciphertext);

        await this.update(newBooking.id, {
            checkSum: ciphertext
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
                all: true,
                nested: true
            }]
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
