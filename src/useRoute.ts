import { useCallback, FunctionComponent } from 'react';
import { RouteProps, useParams } from 'react-router';
import invariant from 'invariant';
import { useMappingContext } from './MappingProvider';

export interface IRoute {
    path:string;
    name:string;
    label:string;
}

export interface IRouteComponent extends RouteProps {
    name:string;
    label:string;
    routes?:IRoute[];
    as?:FunctionComponent<RouteProps>;
}

/**
 * Hook customizado para uso das rotas mapeadas
 */
const useRoute = () => {
	
    const routes = useMappingContext();

    invariant(Object.values(routes).length, 'You should not use "useRoute" outside a <MappingProvider>');

    const routeParams = useParams();

    const lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');

    /**
	 * Resgata uma rota em especifica quando o arumento "name" for informado
	 * 
	 * @param {String} name - Chave de identificação da rota
	 * @param {Object} params - Objeto de parâmetros para substituição nas rotas
	 */
    const route = useCallback((name:string, params:Record<string, string>):string => {

        if (!name) {

            throw '\'Name\' argument not reported';
        }

        if (Object.keys(routes).length) {
			
            if (routes[name]) {

                const { props : { path } } = routes[name];

                let pathname = String(path || '');

                params = { ...routeParams, ...params };

                for (const param in params) {
	
                    const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
                    
                    pathname = pathname.replace(regExp, params[param]);
                }
	
                return pathname.replace(lastParamExp, '');
            }
        }

        return '';
    }, [ routes, routeParams ]);

    /**
	 * Lista todas as rotas da aplicação
	 */
    const all = useCallback(():Record<string, IRoute> => {

        const list:Record<string, IRoute> = {};

        for (const route in routes) {
			
            const { props : { path, label } } = routes[route];

            if (path && path.length) {

                list[route] = {
                    name : route,
                    label,
                    path : String(path || '').replace(lastParamExp, '')
                };
            }
        }

        return list;
    }, [ routes ]);

    return {
        route,
        all
    };
};

export default useRoute;