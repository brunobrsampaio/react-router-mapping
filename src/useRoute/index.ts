import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import invariant from 'invariant';

// Contexts
import { useMappingContext } from '../MappingProvider';

// Interfaces
import { IRouteProps } from './interfaces';

const lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');

/**
 * Hook customizado para uso das rotas mapeadas
 */
const useRoute = () => {
	
    const routes = useMappingContext();

    invariant(Object.values(routes).length, 'You should not use "useRoute" outside a <MappingProvider>');

    const routeParams = useParams();

    /**
	 * Resgata uma rota em especifica quando o arumento "name" for informado
	 * 
	 * @param {String} name - Chave de identificação da rota
	 * @param {Object} params - Objeto de parâmetros para substituição nas rotas
	 */
    const route = useCallback((name:string, params:Record<string, unknown>):string => {

        if (!name) {

            throw '\'Name\' argument not reported';
        }

        if (Object.keys(routes).length) {
			
            if (routes[name]) {

                const { props : { path } } = routes[name];

                let pathname = (path || '');

                params = { ...routeParams, ...params };

                for (const param in params) {
	
                    const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
                    
                    pathname = pathname.replace(regExp, String(params[param]));
                }
	
                return pathname.replace(lastParamExp, '');
            }
        }

        return '';
    }, [ routes, routeParams ]);

    /**
	 * Lista todas as rotas da aplicação
	 */
    const all = useCallback(():Record<string, IRouteProps> => {

        const list:Record<string, IRouteProps> = {};

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