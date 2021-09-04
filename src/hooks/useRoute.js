import { useCallback } from 'react';
import { useMappingContext } from '../MappingProvider';

/**
 * Hook customizado para uso das rotas mapeadas
 */
const useRoute = () => {
	
    const routes = useMappingContext();

    const lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');

    /**
	 * Resgata uma rota em especifica quando o arumento "name" for informado
	 * 
	 * @param {String} name - Chave de identificação da rota
	 * @param {Object} params - Objeto de parâmetros para substituição nas rotas
	 */
    const route = useCallback((name, params) => {

        if (!name) {

            throw '\'Name\' argument not reported';
        }

        if (Object.keys(routes).length) {
			
            if (routes[name]) {

                const { props : { path } } = routes[name];
	
                let pathname = path[0];
		
                for (const param in params) {
	
                    const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
	
                    pathname = pathname.replace(regExp, params[param]);
                }
	
                return pathname.replace(lastParamExp, '');
            }
        }

        return '';
    }, [ routes ]);

    /**
	 * Lista todas as rotas da aplicação
	 */
    const all = useCallback(() => {

        const list = {};

        for (var route in routes) {
			
            const { props : { path, label } } = routes[route];

            if (path.length) {

                list[route] = {
                    label,
                    path : path[0].replace(lastParamExp, '')
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