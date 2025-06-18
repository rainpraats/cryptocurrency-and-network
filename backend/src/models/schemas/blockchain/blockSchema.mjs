import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  hash: { type: String, required: true },
  lastHash: { type: String, required: true },
  data: { type: Array, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  userId: { type: String, required: true },
});

export default blockSchema;
