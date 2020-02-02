import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), CommonModule],
  providers: [CatService, CatResolver],
})
export class CatModule {}
