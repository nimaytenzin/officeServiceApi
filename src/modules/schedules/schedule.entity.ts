import { Table, Column, Model, DataType,ForeignKey,BelongsTo, HasOne } from 'sequelize-typescript';
import { Bus } from '../buses/bus.entity';
import { Stop } from '../stops/stop.entity';

@Table
export class Schedule extends Model {

    @ForeignKey(() => Bus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    busId: number;

    @BelongsTo(()=>Bus)
    bus: Bus;

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
        type: DataType.DATE,
        allowNull: false,
    })
    departureTime: Date;



    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    ETA: Date;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    fare: Date;

}