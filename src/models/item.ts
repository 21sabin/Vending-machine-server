import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  stock:{
    type:Number,
    required:true
  }
});

const Item = mongoose.model<any , any>('Product',itemSchema);

export { Item };