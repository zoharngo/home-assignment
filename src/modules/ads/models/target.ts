import { locationSchema } from "./location";

import mongoose from 'mongoose';


export const targetSchema = new mongoose.Schema({
  _id: false,
  location: locationSchema,
  operatingSystems: {
    type: [String],
    require: true,
  },
  browsers: {
    type: [String],
    require: true,
  },
  tags: {
    type: [String],
    require: true,
  },
});