import { Module, HttpModule } from '@nestjs/common';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { MapController } from './controllers/map.controller';
import { MapService } from './services/map.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [MapService],
  controllers: [MapController],
  exports: [MapService],
})
export class ApiModule {}
