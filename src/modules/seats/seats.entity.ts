import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo} from 'sequelize-typescript';
import { Bus } from '../buses/buses.entity';


@Table
export class Seats extends Model {

    @ForeignKey(() => Bus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false, 
    })

    busId: number;

    @BelongsTo(() => Bus)
    bus: Bus[];
    

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


