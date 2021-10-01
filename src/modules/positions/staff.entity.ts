import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from '../departments/department.entity';
import { Division } from '../divisions/division.entity';
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
    extension_number: string;

    @Column({
        type: DataType.STRING,
        unique: true,
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
        allowNull: true,
    })
    profile_uri: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    signature_uri: string;

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
}