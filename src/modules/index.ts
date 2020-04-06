import { ApiModule } from './api/api.module';
import { UploadModule } from './upload/upload.module';
import { WebsocketModule } from './websocket/websocket.module';

import { AuthModule } from './auth/auth.module';
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';

export default [
  ApiModule,
  UploadModule,
  WebsocketModule,
  // AuthModule,
  // CatModule,
  // UserModule
];
