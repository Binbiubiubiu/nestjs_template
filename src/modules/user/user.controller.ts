import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@ApiTags('用户模块')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Crud({
  model: {
    type: UserEntity,
  },
})
@UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController implements CrudController<UserEntity> {
  service: UserService;

  constructor(public usersService: UserService) {
    this.service = usersService;
  }
}
