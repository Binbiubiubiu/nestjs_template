import { Provider } from '@nestjs/common';
import { ReturnBodyInterceptor } from './return-body.interceptor';
import { GlobalInterceptorAdapter } from '../utils/provider.adapter';

const interceptors = [new ReturnBodyInterceptor()];

export const GlobalInterceptors: Provider[] = interceptors.map(
  GlobalInterceptorAdapter,
);
