import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  }
},{timestamps:true});

const Transaction = mongoose.model<any,any>('Transaction',transactionSchema);

export { Transaction };