import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';

/**
 * 适配全局的通道
 * @param pipe
 */
export const GlobalPipeAdapter = (pipe: any) => {
  return {
    provide: APP_PIPE,
    useValue: pipe,
  };
};

/**
 * 适配 全局的拦截器
 * @param interceptor
 */
export const GlobalInterceptorAdapter = (interceptor: any) => {
  return {
    provide: APP_INTERCEPTOR,
    useValue: interceptor,
  };
};

/**
 * 适配 全局的过滤器
 * @param filter
 */
export const GlobalFilterAdapter = (filter: any) => {
  return {
    provide: APP_FILTER,
    useValue: filter,
  };
};

/**
 * 适配 全局的门卫
 * @param guard
 */
export const GlobalGuardAdapter = (guard: any) => {
  return {
    provide: APP_GUARD,
    useValue: guard,
  };
};
