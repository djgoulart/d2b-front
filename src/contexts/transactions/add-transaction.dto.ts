export type AddTransactionInputDTO = {
  description: string,
  amount: number,
  type: 'deposit'|'expense'|string,
  account: string
  receipt: any
}