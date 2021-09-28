import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from '../departments/department.entity';
import { Division } from '../divisions/division.entity';
import { Section } from '../sections/section.entity';

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    contact: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    ext_no: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    cid: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    emp_id: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    position: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    designation: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    profile_uri: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    role: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    signature_uri: string;

    @ForeignKey(() => Department)
    @Column
    departmentId: number
  
    @BelongsTo(() => Department)
    department: Department


    @ForeignKey(() => Division)
    @Column
    divisionId: number
  
    @BelongsTo(() => Division)
    division: Division


    @ForeignKey(() => Section)
    @Column
    sectionId: number
  
    @BelongsTo(() => Section)
    section: Section

    
}