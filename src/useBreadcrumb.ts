import { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import invariant from 'invariant';

// Contexts
import { useMappingContext } from './MappingProvider';

// Interfaces
import { IRouteMap } from './useMap/interfaces';

const useBreadcrumb = () => {

  const routes = useMappingContext();

  invariant(routes.size, 'You should not use \'useBreadcrumb\' outside a <MappingProvider>');

  const { pathname } = useLocation();

  const breadcrumb = useMemo(():IRouteMap[] => {

    const list:IRouteMap[] = [];

    routes.forEach((route, name) => {

      const { path, label } = route;

      if (path && path.length && path !== '/') {

        const match = matchPath({
          path: String(path || ''),
          end: false
        }, pathname);

        if (match) {

          list.push({  
            name,
            path : match.pathname, 
            label 
          });
        }
      }
    });

    return list;
  }, [ routes, pathname ]);

  return breadcrumb;
};

export default useBreadcrumb;