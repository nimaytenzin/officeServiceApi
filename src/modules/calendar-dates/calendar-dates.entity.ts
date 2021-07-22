import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';

@Table({
    timestamps:false
})
export class CalendarDate extends Model {

    @Column({
        type: DataType.DATE,
        primaryKey:true,
        allowNull:false
    })
    Calendar_Date: Date;

    @Column({
        type: DataType.TINYINT,
        allowNull: true,
    })
    Calendar_Month: number;

    @Column({
        type: DataType.TINYINT,
        allowNull: true,
    })
    Calendar_Day: number;

    @Column({
        type: DataType.SMALLINT,
        allowNull: true,
    })
    Calendar_Year: number

    @Column({
        type: DataType.TINYINT,
        allowNull: true,
    }) 
    Calendar_Quarter: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) 
    Day_Name: string;

    @Column({
        type: DataType.TINYINT,
        allowNull: true,
    }) 
    Day_of_Week: number;

    @Column({
        type: DataType.SMALLINT,
        allowNull: true,
    }) 
    Day_of_Year: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    }) 
    Week_of_Year: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) 
    Month_Name: string;

    @Column({
        type: DataType.TINYINT,
        allowNull: true,
    }) 
    Is_Leap_Year: number;

    @Column({
        type: DataType.TINYINT,
        allowNull: true,
    }) 
    Days_in_Month: number;
}