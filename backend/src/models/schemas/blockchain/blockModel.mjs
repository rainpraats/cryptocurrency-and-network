import mongoose from 'mongoose';
import blockSchema from './blockSchema.mjs';

export default mongoose.model('BLock', blockSchema);
