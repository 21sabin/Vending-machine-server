import { Transaction } from '../models';

class TransactionService {

  getAllTransactions() {
    return new Promise(async (resolve, reject) => {
      try {
        const transaction = await Transaction.find();
        resolve(transaction)
      } catch (error) {
        reject(error);
      }
    })
  }

  getTransactionsSummary() {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions = await Transaction.find().lean();
        const summary = transactions.reduce((acc: any, val: any) => {
          const { name, quantity, price } = val;
          acc[name] = acc[name] ?
          {...acc[name],quantity:acc[name].quantity+parseFloat(quantity),price:parseFloat(acc[name].price)+parseFloat(price)}:val;
          return acc;
        }, {})
        resolve(summary);
      } catch (error) {
        reject(error);
      }
    })
  }
}

const transactionService = new TransactionService();

export { transactionService };