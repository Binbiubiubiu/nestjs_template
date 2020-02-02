import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { CatModule } from './cat/cat.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

export default [ApiModule, AuthModule, CatModule, UploadModule, UserModule];
