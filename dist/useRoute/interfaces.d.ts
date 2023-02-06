import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';
export type IRouteProps = RouteProps & {
    name?: string;
    label?: string;
    as?: FunctionComponent<RouteProps>;
    routes?: IRouteProps[];
};
