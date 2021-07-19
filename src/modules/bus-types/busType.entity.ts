import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import { Bus } from '../buses/bus.entity';

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    make: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    model: string;

    
    @BelongsTo(() => Bus)
    bus: Bus[];
}