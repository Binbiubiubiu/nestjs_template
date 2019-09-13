import { Module, HttpModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MapController } from './controllers/map.controller';
import { MapService } from './services/map.service';
// import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    // GraphQLModule.forRoot({}),
  ],
  providers: [MapService],
  controllers: [MapController],
  exports: [MapService],
})
export class ApiModule {}
