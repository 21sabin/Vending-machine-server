import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
  credit: {
    type: Number,
    default: 100
  }
});

const Credit = mongoose.model<any, any>('Credit', creditSchema);

export { Credit };