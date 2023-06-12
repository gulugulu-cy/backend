import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { UserModel } from '../entity/userEntity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { CustomHttpError, httpErrorCode } from '../error/CustomHttpError';

@Provide()
export class UserService {
  @InjectEntityModel(UserModel)
  userModel: Repository<UserModel>;

  public async findUserInfo(username: string, password: string) {
    const user = await this.userModel.findOne({
      where: { username, password },
    });
    if (!user.id) {
      throw new CustomHttpError(httpErrorCode['LOGIN_EXCEPTION']);
    }
    return user;
  }
}
