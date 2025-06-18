import mongoose from 'mongoose';
import signatureSchema from './signatureSchema.mjs';

const inputSchema = new mongoose.Schema(
  {
    timestamp: { type: Number },
    amount: { type: Number },
    address: { type: String, required: true },
    signature: { type: signatureSchema },
  },
  { _id: false }
);

export default inputSchema;
