import database from '../database/connection.js';

export default function userAuth (server) {
    server.auth.strategy('user', 'bearer-access-token', {
        validate: async (req, token, h) => {console.log('in validate');
        const user = await database.user.findOne({token});
        if(token !== null||undefined) {console.log('--------------ok');
        return {
                isValid: true,
                credentials: user,
                artifacts:{}
            }}
        else { console.log('----------no');
            return {
                isValid: false,
                credentials: user,
                artifacts:{}
            }
        }}
    });

}