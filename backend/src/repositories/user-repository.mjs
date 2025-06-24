import userModel from '../models/schemas/userModel.mjs';
import transactionModel from '../models/schemas/transactions/transactionModel.mjs';
import blockModel from '../models/schemas/blockchain/blockModel.mjs';

export default class UserRepository {
  async add(user) {
    return await userModel.create(user);
  }

  async findById(id) {
    return await userModel.findById(id);
  }

  async find(email, login) {
    return login === true
      ? await userModel.findOne({ email: email }).select('+password')
      : await userModel.findOne({ email: email });
  }

  async list() {
    return await userModel.find();
  }

  async addAllUserTransactions(transactions) {
    const plainTransactions = transactions.map((tx) => {
      return { ...tx };
    });
    await transactionModel.insertMany(plainTransactions);
  }

  async addBlockToUser(block) {
    return await blockModel.create(block);
  }

  async getTransactionsByUser(userId) {
    return await transactionModel.find({ userId: userId });
  }

  async getBlocksByUser(userId) {
    return await blockModel.find({ userId: userId });
  }
}
