import { Module } from '@nestjs/common';

import { GlobalPipes } from './pipes';
import { GlobalInterceptors } from './interceptors';
import { PubSubProvider } from './providers/pub-sub.provider';

@Module({
  imports: [],
  providers: [...GlobalPipes, ...GlobalInterceptors, PubSubProvider],
  exports: [PubSubProvider],
})
export class CommonModule {}
