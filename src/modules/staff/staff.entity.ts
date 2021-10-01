import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from '../departments/department.entity';
import { Designation } from '../designations/designation.entity';
import { Division } from '../divisions/division.entity';
import { Position } from '../positions/position.entity';
import { Section } from '../sections/section.entity';

@Table
export class Staff extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    contact: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    extension_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cid: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    employment_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profile_uri: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    signature_uri: string;

    @ForeignKey(() => Position)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    positionId: number
    @BelongsTo(() => Position)
    position: Position

    @ForeignKey(() => Designation)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    designationId: number
    @BelongsTo(() => Designation)
    designation: Designation

    @ForeignKey(() => Department)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    departmentId: number
    @BelongsTo(() => Department)
    department: Department


    @ForeignKey(() => Division)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    divisionId: number
    @BelongsTo(() => Division)
    division: Division
    
    @ForeignKey(() => Section)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    sectionId: number
    @BelongsTo(() => Section)
    section: Section   

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role: string;
}