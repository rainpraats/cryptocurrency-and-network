import mongoose from 'mongoose';
import inputSchema from './inputSchema.mjs';

const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  outputMap: {
    type: Map,
    of: Number,
    required: true,
  },
  input: { type: inputSchema, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model('Transaction', transactionSchema);
