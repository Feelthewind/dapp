import { Server, ServerCredentials } from 'grpc';
import { initDB } from './db';

import { Greeter, GreeterService } from './services/Greeter';
import { Health, HealthService, healthStatus, ServingStatus } from './services/Health';
import { UserService, User } from './services/User';
import { logger } from './utils';

// https://github.com/grpc/grpc/issues/6976
// https://pm2.io/doc/en/runtime/guide/load-balancing/#cluster-environment-variable
let port = 50051;
if (process.env.NODE_APP_INSTANCE) {
  port += Number(process.env.NODE_APP_INSTANCE);
}

initDB();

// Do not use @grpc/proto-loader
const server: Server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1,
});
server.addService(GreeterService, new Greeter());
server.addService(HealthService, new Health());
server.addService(UserService, new User());
server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure());
server.start();

logger.info('gRPC:Server', new Date().toDateString());

// Change service health status
healthStatus.set('helloworld.Greeter', ServingStatus.NOT_SERVING);
