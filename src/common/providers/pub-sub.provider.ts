import { Provider } from '@nestjs/common';
import { PUB_SUB } from './contants';
import { PubSub } from 'graphql-subscriptions';

export const PubSubProvider: Provider = {
  provide: PUB_SUB,
  useValue: new PubSub(),
};
