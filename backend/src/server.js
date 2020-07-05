'use strict';

import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import * as path from 'path';
import routesArr from './routes.js';
import AuthBearer from 'hapi-auth-bearer-token';
import makeAdminAuth from './auth/adminAuth.js';
import makeUserAuth from './auth/userAuth.js';
import Inert from '@hapi/inert';

dotenv.config({path:path.join(path.resolve(), './.env')});

const init = async () => {
    console.log(process.env.PORT);
    console.log(process.env.HOST);

    const server = Hapi.server({
        port:parseInt(process.env.PORT || '3000', 10),
        host:process.env.HOST || 'localhost',
        routes:{
            validate:{
                failAction:(req, h, err) =>{
                    throw err
                }
            },
            cors: true,
        }
    });


    await server.register([
        AuthBearer,
        Inert,
    ]);
    //server.ext('onPreResponse', corsHeaders);
makeAdminAuth(server);
makeUserAuth(server);
server.route(routesArr);


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

//cd C:\Program Files\MongoDB\Server\3.2\bin
//mongod --storageEngine=mmapv1 --dbpath C:\data