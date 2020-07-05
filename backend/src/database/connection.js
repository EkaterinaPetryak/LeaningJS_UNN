import userSchema from './userSchema.js';
import mongoose from 'mongoose';
import postSchema from './postSchema.js';
import commentSchema from './commentSchema.js';
import likeSchema from './likeSchema.js'

const dbName = 'mySite';
const host = process.env.MONGO_HOST||'localhost';
const port = process.env.MONGO_PORT||27017;
const uri = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Ошибка при подключении к Монге!', err)
});
db.once('open', () => {
        console.log('Успешное подключение к Монге!');
    });
const user = mongoose.model('user', userSchema);
const post = mongoose.model('post', postSchema);
const comment = mongoose.model('comment', commentSchema);
const like = mongoose.model('like', likeSchema);
export default {user, post, comment, like};
