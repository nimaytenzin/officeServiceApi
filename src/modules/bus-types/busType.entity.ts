import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';

@Table
export class BusType extends Model {

    
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

}