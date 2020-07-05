import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
        name: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }],
    }
);

export default schema;