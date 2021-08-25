
export class ConfirmDto {
    readonly bfs_bfsTxnTime: string;
    readonly bfs_benfTxnTime: number;
    readonly bfs_orderNo: string;
    readonly bfs_benfId: string;
    readonly bfs_txnCurrency: string;
    readonly bfs_txnAmount: number;
    readonly bfs_checkSum: string;
    readonly bfs_remitterName: string;
    readonly bfs_remitterBankId: string;
    readonly bfs_debitAuthCode: string;
    readonly bfs_debitAuthNo: string;
}