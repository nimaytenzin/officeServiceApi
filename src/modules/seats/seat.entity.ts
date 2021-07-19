import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo} from 'sequelize-typescript';
import { Bus } from '../buses/bus.entity';


@Table
export class Seat extends Model {

    @ForeignKey(() => Bus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false, 
    })

    busId: number;

    @BelongsTo(() => Bus)
    bus: Bus;
    

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    seatNumber: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })

    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })

    type: string;

   
}


