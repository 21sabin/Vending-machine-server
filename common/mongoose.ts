import mongoose from 'mongoose';
import envs from '../config';
const startDb = async () => {
  try {
    await mongoose.connect(envs.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Database connection successful')
  } catch (error) {
    console.log('Database connection failed',error)
  }
}

startDb();
