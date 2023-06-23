import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

type ConditionalProps = 
| {
  name: string;
  routes?: never;
}
| {
  name?: never;
  routes?: IRouteProps[];
}

export type IRouteProps = ConditionalProps & RouteProps & Partial<{
  label: string;
  as: FunctionComponent<RouteProps>;
}>

export interface IUseRoute {
  route: (name:string, params?: Record<string, unknown>) => string;
  all: () => unknown;
}