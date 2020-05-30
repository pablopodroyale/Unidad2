import express from 'express';
import ENUM_SERVERS from './EnumServers.js';
import {router } from '../router.js';
import bodyParser from 'body-parser';
function CreateServer(type){
    let server;
    switch (type) {
        case ENUM_SERVERS.EXPRESS:
            server = express();
            server.use(bodyParser.json());  
            server.use(bodyParser.urlencoded({ extended: false }));
            server.use('/Estudiante', router);
            break;
        default:
            break;
    }
    return server;
}

export default{
    CreateServer
}