import FactoryServer from './Helper/FactoryServer.js';
import ENUM_SERVERS from './Helper/EnumServers.js';
import factoryServerPort from './Helper/FactoryServerPort.js';
import EnumPort from './Helper/EnumPort.js';

const server = FactoryServer.CreateServer(ENUM_SERVERS.EXPRESS);
factoryServerPort.StartListen(server,EnumPort.PORT_3000);




