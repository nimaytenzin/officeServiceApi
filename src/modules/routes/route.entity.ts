import { Table, Column, Model, DataType,ForeignKey,BelongsTo, HasOne } from 'sequelize-typescript';
import { Stop } from '../stops/stop.entity';

@Table
export class Route extends Model {

    //originId
    @ForeignKey(()=>Stop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    originId: number;
    @BelongsTo(()=>Stop,{foreignKey:"originId"})
    origin: Stop; 

    // destination id
    @ForeignKey(()=>Stop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    destinationId:number
    @BelongsTo(()=>Stop,{foreignKey:"destinationId"})
    destination: Stop; 

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    departureTime: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    ETA: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    fare: number;

}