import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';


@Table
export class Position extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    position_category: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    hierarchical_level: number;
    
}