import { RouteConfigContext } from '@/lib/route-config';
import { useContext } from 'react';
import route, { RouteParamsWithQueryOverload, Router } from 'ziggy-js';

export default function useRoute() {
  function routeWrapper(
    name?: undefined,
    params?: RouteParamsWithQueryOverload,
    absolute?: boolean,
  ): Router;
  function routeWrapper(
    name: string,
    params?: RouteParamsWithQueryOverload,
    absolute?: boolean,
  ): string;
  function routeWrapper(
    name?: any,
    params?: RouteParamsWithQueryOverload,
    absolute?: boolean,
  ): any {
    const routeConfig = useContext(RouteConfigContext);

    return typeof window !== 'undefined'
      ? (window as any).route(name, params, absolute)
      : route(name, params, absolute, routeConfig);
  }

  return routeWrapper;
}
