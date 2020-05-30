import enumPort from './EnumPort.js';

function StartListen(server,port) {
    switch (port) {
        case enumPort.PORT_3000:
            server.listen(enumPort.PORT_3000, () =>
                console.log('Escuchando en puerto: ' + enumPort.PORT_3000 ),
            );
            break;
        default:
            break;
    }
}

export default{
    StartListen
}