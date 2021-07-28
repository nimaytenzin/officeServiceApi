import { Table, Column, Model, DataType,ForeignKey,BelongsTo, HasOne } from 'sequelize-typescript';
import { Route } from '../routes/route.entity'

@Table
export class RouteDay extends Model {

    @ForeignKey(()=>Route)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    routeId: number;
    @BelongsTo(()=>Route)
    route : Route; 

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    day:number
}