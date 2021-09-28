import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from '../departments/department.entity';
import { Section } from '../sections/section.entity';

@Table
export class Division extends Model {
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

    @ForeignKey(() => Department)
    @Column
    departmentId: number
  
    @BelongsTo(() => Department)
    department: Department

    @HasMany(() => Section)
     sections: Section[];

}