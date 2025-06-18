import mongoose from 'mongoose';
import blockSchema from './blockSchema.mjs';

const blockchainSchema = new mongoose.Schema({
  chain: { type: [blockSchema], required: true },
});

export default mongoose.model('Blockchain', blockchainSchema);
