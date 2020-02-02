import { Module } from '@nestjs/common';
import { GlobalPipes } from './pipes';
import { GlobalInterceptors } from './interceptors';
import { GlobalProvider } from './providers';

@Module({
  imports: [],
  providers: [...GlobalPipes, ...GlobalInterceptors, ...GlobalProvider],
  exports: [...GlobalProvider],
})
export class CommonModule {}
