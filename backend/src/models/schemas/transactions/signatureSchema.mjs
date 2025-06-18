import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema(
  {
    r: { type: String },
    s: { type: String },
    recoveryParam: { type: Number },
  },
  { _id: false }
);

export default signatureSchema;
