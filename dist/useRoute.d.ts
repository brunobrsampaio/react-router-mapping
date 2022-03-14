import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router';
export interface IRoute {
    path: string;
    name: string;
    label: string;
}
export interface IRouteComponent extends RouteProps {
    name: string;
    label: string;
    routes?: IRoute[];
    as?: FunctionComponent<RouteProps>;
}
/**
 * Hook customizado para uso das rotas mapeadas
 */
declare const useRoute: () => {
    route: (name: string, params: Record<string, string>) => string;
    all: () => Record<string, IRoute>;
};
export default useRoute;
