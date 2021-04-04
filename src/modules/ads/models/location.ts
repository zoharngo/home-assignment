import mongoose from 'mongoose';

export const locationSchema = new mongoose.Schema({
  _id: false,
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  }
});
