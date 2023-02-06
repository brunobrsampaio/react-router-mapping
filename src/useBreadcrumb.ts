import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import invariant from 'invariant';

// Contexts
import { useMappingContext } from './MappingProvider';

// Interfaces
import { IRouteProps } from './useRoute/interfaces';

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */
const useBreadcrumb = () => {

    const routes = useMappingContext();

    invariant(Object.values(routes).length, 'You should not use "useBreadcrumb" outside a <MappingProvider>');

    const { pathname } = useLocation();

    const breadcrumb = useMemo(():IRouteProps[] => {

        const list:IRouteProps[] = [];

        for (const route in routes) {

            const { props : { path, label } } = routes[route];
            
            if (label && path && path.length && path !== '/') {

                const match = matchPath({
                    path: String(path || ''),
                    end: false
                }, pathname);

                if (match) {

                    list.push({ 
                        name : route, 
                        path : match.pathname, 
                        label 
                    });
                }
            }
        }

        return list;
    }, [ routes, pathname ]);

    return breadcrumb;
};

export default useBreadcrumb;