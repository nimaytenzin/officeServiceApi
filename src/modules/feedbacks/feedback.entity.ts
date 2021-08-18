import { Table, Column, Model, DataType, BelongsTo,ForeignKey,HasMany } from 'sequelize-typescript';


@Table
export class Feedback extends Model {


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    feedback: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue:false
    })
    dismissed: boolean;

   

       
}