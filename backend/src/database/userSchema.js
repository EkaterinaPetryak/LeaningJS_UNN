import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema(
        {email: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        userName: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        userSurname: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        birthday: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        token: {
            type: mongoose.Schema.Types.String,
            default: uuid.v4
        },
         userId: {
             type: mongoose.Schema.Types.String,
             default: uuid.v4
         },
            posts: [

                {   type: mongoose.Schema.Types.ObjectId,
                    ref: 'post'
                }
            ],

            //timestamps:true

        }
);

export default schema;
