import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        comment: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        data: {
            type: mongoose.Schema.Types.Date,
            default: Date.now
        },
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        userName: {
            type: mongoose.Schema.Types.String
        }
    }
);

export default schema;