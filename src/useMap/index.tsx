import React, { cloneElement } from 'react';
import { Route } from 'react-router-dom';

// Interfaces
import { IRouteProps } from '../useRoute/interfaces';
import { IRouteMap, IUseMap } from './interfaces';

const useMap = (routes: IRouteProps[]): IUseMap => {
  
  const listRoutes = new Map<string, IRouteMap>();

  const recursiveRoutes = (list: IRouteProps[], previousPath?: string) => {

    const childRoutes: React.ReactNode[] = [];

    list.forEach(({ name, label, path, routes, ...rest }) => {

      const nestedPath = [ previousPath, path ].filter(Boolean).join('/').replace(/(\/+)/g, '/');

      if (!path?.includes('*') && name) {
  
        if (!listRoutes.has(name)) {

          listRoutes.set(name, {
            name,
            label,
            path: nestedPath
          });
        } else {

          console.warn(`A route named \'${name}\' has been duplicated in this \'useMap\' instance`);
        }
      }
          
      childRoutes.push(cloneElement(<Route />, { key: nestedPath, path : nestedPath, ...rest }, routes && recursiveRoutes(routes, nestedPath)));
    });

    return childRoutes;
  };

  return [
    recursiveRoutes(routes),
    listRoutes as ReadonlyMap<string, IRouteMap>
  ];
};

export default useMap;