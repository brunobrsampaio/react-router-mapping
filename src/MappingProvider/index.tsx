import React, { createContext, useContext, useMemo } from 'react';

// Interfaces
import { IMappingProvider, IMappingContext } from './interfaces';
import { IRouteMap } from '../useMap/interfaces';

const MappingContext = createContext<IMappingContext>({} as IMappingContext);

export const useMappingContext = () => useContext(MappingContext);

const MappingProvider = ({ children, routes }: IMappingProvider) => {
  
  const value = useMemo(() => {
    
    if (Array.isArray(routes)) {
      
      const mapRoutes = new Map<string, IRouteMap>();
      
      routes.forEach((map) => {

        map.forEach((route, name) => {
          if (!mapRoutes.has(name)) {

            mapRoutes.set(name, route);
          } else {

            console.warn(`A route named \'${name}\' has been duplicated in this <MappingProvider> instance`);
          }
        });
      });

      return mapRoutes;
    }

    return routes;
  }, [ routes ]);

  return (
    <MappingContext.Provider value={value}>
      { children }
    </MappingContext.Provider>
  );
};

export default MappingProvider;