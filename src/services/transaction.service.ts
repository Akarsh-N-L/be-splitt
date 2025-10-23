import TransactionDb from "../models/transaction.model";
import { IFullTransaction } from "../utils/interfaces/transaction.interface";

const addTransaction = async (transactionData: IFullTransaction) => {
  const transaction = new TransactionDb({
    ...transactionData,
    createdAt: new Date(),
    lastEditAt: new Date(),
    active: true,
  });

  const savedTransaction = await transaction.save();
  return {
    success: true,
    data: savedTransaction,
    message: "Transaction created successfully",
  };
};

const getTransactionById = async (transactionId: string) => {
  const transaction = await TransactionDb.findOne({
    _id: transactionId,
    active: true,
    deletedAt: null,
  });

  if (!transaction) {
    return {
      success: false,
      message: "Transaction not found",
    };
  }

  return {
    success: true,
    data: transaction,
  };
};

export default { addTransaction };
