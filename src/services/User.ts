// import { ListValue, Struct, Value } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall } from 'grpc';

import { IUserServiceServer, UserServiceService } from '../../models/user_grpc_pb';
import { User, UserById, UserInput } from '../../models/user_pb';

class Usersss implements IUserServiceServer {
  public getUserById(call: ServerUnaryCall<UserById>, callback: sendUnaryData<User>): void {
    const res = new User();
    res.setId(1);
    res.setName('aaa');

    callback(null, res);
  }

  public createUser(call: ServerUnaryCall<UserInput>, callback: sendUnaryData<User>): void {
    const res = new User();
    res.setId(1);
    res.setName('aaa');
    console.log('aa');

    callback(null, res);
  }
}

export { Usersss, UserServiceService };
