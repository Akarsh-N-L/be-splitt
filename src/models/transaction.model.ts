import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  paidBy: { type: Array<String>, required: true },
  amount: { type: Number, required: true },
  splitAmong: { type: Array<String>, required: true },
  groupId: { type: String, required: true },
  image: { type: String, default: null },
  slug: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  lastEditAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  createdBy: { type: String, required: true },
  active: { type: Boolean, default: true },
  transactionDate: { type: Date, required: true },
});

transactionSchema.index({ groupId: 1, active: 1, transactionDate: -1 });
transactionSchema.index({ groupId: 1, transactionDate: -1 });
transactionSchema.index({ slug: 1 });

const TransactionDb = mongoose.model("transaction", transactionSchema);
export default TransactionDb;
