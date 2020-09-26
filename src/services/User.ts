// import { ListValue, Struct, Value } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall } from 'grpc';
import { db } from 'src/db';
import { logger } from 'src/utils';
import { IUserServer, UserService } from 'models/user_grpc_pb';
import { UserById, UserInput, UserResult } from 'models/user_pb';

class User implements IUserServer {
  public async getUserById(call: ServerUnaryCall<UserById>, callback: sendUnaryData<UserResult>): Promise<void> {
    try {
      const res = new UserResult();

      const userId = call.request.getId();

      const user = (await db.get(userId)).toString();
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);

      res.setId(parsedUser.id);
      res.setName(parsedUser.name);

      callback(null, res);
    } catch (err) {
      console.error(err);
    }
  }

  public async createUser(call: ServerUnaryCall<UserInput>, callback: sendUnaryData<UserResult>): Promise<void> {
    // const res = new User();
    // res.setId(1);
    // res.setName('aaa');
    // console.log('aa');
    // console.log('bbb');

    try {
      logger.info('createUser:', call.request.toObject(), call.metadata.getMap());

      const id = call.request.getId();
      const name = call.request.getName();

      await db.put('aaa', JSON.stringify({ id, name }));

      const res: UserResult = new UserResult();
      res.setId(id);
      res.setName(name);
      callback(null, res);
    } catch (err) {
      console.error(err);
    }
    // callback(null, res);
  }
}

export { User, UserService };
