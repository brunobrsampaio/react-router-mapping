import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router';
import invariant from 'invariant';
import { useMappingContext } from './MappingProvider';
import { IRoute } from './useRoute';

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */
const useBreadcrumb = () => {

    const routes = useMappingContext();

    invariant(Object.values(routes).length, 'You should not use "useBreadcrumb" outside a <MappingProvider>');

    const { pathname } = useLocation();

    const breadcrumb = useMemo(():IRoute[] => {

        const list:IRoute[] = [];

        for (const route in routes) {

            const { props : { path, label } } = routes[route];
            
            if (label && path && path.length && path !== '/') {

                const match = matchPath(pathname, {
                    strict : true,
                    path : String(path || '')
                });

                if (match) {

                    list.push({ 
                        name : route, 
                        path : match.path, 
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