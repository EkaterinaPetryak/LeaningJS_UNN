import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        title: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.String,
            required: true
        },

        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
                  },
        userName: {
            type: mongoose.Schema.Types.String,
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        }],
        data: {
            type: mongoose.Schema.Types.Date,
            default: Date.now
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }]


    }
);

export default schema;