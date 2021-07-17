import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import { Bus } from '../buses/buses.entity';

@Table
export class BusType extends Model {

    @ForeignKey(() => Bus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    busId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })

    type: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    capacity: number;


    
    @BelongsTo(() => Bus)
    bus: Bus[];
}