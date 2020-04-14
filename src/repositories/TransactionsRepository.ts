import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public sumByType(type: 'income' | 'outcome'): number {
    const initialValue = 0;
    return this.transactions.reduce(
      (prevValue, currentValue) =>
        currentValue.type === type
          ? prevValue + currentValue.value
          : prevValue + 0,
      initialValue,
    );
  }

  public getBalance(): Balance {
    const sumIncome = this.sumByType('income');
    const sumOutcome = this.sumByType('outcome');

    return {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };
  }

  public create({ title, value, type }: TransactionTDO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
