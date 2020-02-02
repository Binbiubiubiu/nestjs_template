import { Provider } from '@nestjs/common';
import { PubSubProvider } from './pub-sub.provider';

export const GlobalProvider: Provider[] = [PubSubProvider];
