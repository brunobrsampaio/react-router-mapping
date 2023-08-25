import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import invariant from 'invariant';

// Contexts
import { useMappingContext } from '../MappingProvider';

// Interfaces
import { IUseRoute } from './interfaces';
import { IRouteMap } from '../useMap/interfaces';

const lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');

const useRoute = (): IUseRoute => {
	
  const routes = useMappingContext();

  invariant(routes.size, 'You should not use "useRoute" outside a <MappingProvider>');

  const routeParams = useParams();

  //
  const route = useCallback((name: string, params?: Record<string, unknown>): string => {

    if (!name) {

      throw '\'Name\' argument not reported';
    }

    if (routes.size) {

      const route = routes.get(name);

      if (route) {

        let { path } = route;
  
        if (path) {
  
          params = { ...routeParams, ...params };
  
          for (const param in params) {
      
            if (param !== '*') {

              const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
                        
              path = path.replace(regExp, String(params[param]));
            }
          }
  
          return path.replace(lastParamExp, '');
        }
      }
    }

    return '';
  }, [ routes, routeParams ]);

  //
  const all = useCallback(():Record<string, IRouteMap> => {

    const list: Record<string, IRouteMap> = {};

    routes.forEach((route, name) => {

      const { path, label } = route;

      let pathname = path;

      for (const param in routeParams) {
    
        if (param !== '*') {

          const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
                    
          pathname = pathname.replace(regExp, String(routeParams[param]));
        }
      }

      list[name] = {
        name,
        label,
        path : pathname.replace(lastParamExp, '')
      };
    });

    return list;
  }, [ routes ]);

  return {
    route,
    all
  };
};

export default useRoute;