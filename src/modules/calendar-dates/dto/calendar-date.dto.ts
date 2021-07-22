import { ApiProperty } from "@nestjs/swagger";
export class CalendarDateDto {
    @ApiProperty()
    CalendarDate: string;

    @ApiProperty()
    Calendar_Date: Date;

    @ApiProperty()
    Calendar_Month: number;

    @ApiProperty()
    Calendar_Day: number;

    @ApiProperty()
    Calendar_Year: number

    @ApiProperty()
    Calendar_Quarter: number;

    @ApiProperty()
    Day_Name: string;

    @ApiProperty()
    Day_of_Week: number;

    @ApiProperty()
    Day_of_Year: number;
    
    @ApiProperty()
    Week_of_Year: number;

    @ApiProperty()
    Month_Name: string;

    @ApiProperty()
    Is_Leap_Year: number;

    @ApiProperty()
    Days_in_Month: number;
}