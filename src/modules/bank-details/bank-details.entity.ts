import { Table, Column, Model, DataType,} from 'sequelize-typescript';


@Table
export class BankDetail extends Model {
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bfs_benfId: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bfs_benfBankCode: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bfs_txnCurrency: string;

    
    
}