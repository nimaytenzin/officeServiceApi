import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Division } from '../divisions/division.entity';

@Table
export class Section extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    vision: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    mission: string;

    @ForeignKey(() => Division)
    @Column
    divisionId: number
  
    @BelongsTo(() => Division)
    division: Division


}