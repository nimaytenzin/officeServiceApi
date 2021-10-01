import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Division } from '../divisions/division.entity';
import { Staff } from '../staff/staff.entity';

@Table
export class Department extends Model {
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
        allowNull: false,
    })
    vision: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    mission: string;

    @HasMany(() => Division)
     divisions: Division[];


}