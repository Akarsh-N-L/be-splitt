import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  paidBy: Array<String>,
  amount: Number,
  splitAmong: Array<String>,
  groupId: String,
  image: String,
  slug: String,
  name: String,
  description: String,
  createdAt: Date,
  lastEditAt: Date,
  deletedAt: Date,
  createdBy: String,
  active: Boolean,
  transactionDate: Date,
});

transactionSchema.index({ groupId: 1, active: 1, transactionDate: -1 });
transactionSchema.index({ groupId: 1, transactionDate: -1 });

const TransactionDb = mongoose.model("transaction", transactionSchema);
export default TransactionDb;
