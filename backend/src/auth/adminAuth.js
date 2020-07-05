import database from '../database/connection.js';


export default function (server) {
    server.auth.strategy('admin', 'bearer-access-token', {
        validate:async (req, token, h) => {console.log('in validate');
        const user = await database.user.find({});

        if (token === process.env.ADMIN_TOKEN) {return {
            isValid:true,
            credentials:user,
            artifacts: {}
        }}
            else {return {
                isValid: false,
                credentials: user,
                artifacts:{}
            }}}
    });

}