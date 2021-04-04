import { targetSchema } from './target';

import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    targeting: targetSchema,
});

export default mongoose.model('ad', adSchema);
