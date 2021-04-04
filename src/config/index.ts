import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGO_DB_URI || 'mongodb://localhost/platform';
const MONGODB_CONNECTION_OPTIONS: mongoose.ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

export {
  MONGODB_URI,
  MONGODB_CONNECTION_OPTIONS
}