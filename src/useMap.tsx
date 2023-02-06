import React, { useCallback } from 'react';
import { Route, RouteProps } from 'react-router-dom';

// Interfaces
import { IRouteProps } from './useRoute/interfaces';

const useMap = (routes:IRouteProps[]) => {

    let routesList:Record<string, React.ReactElement<RouteProps>> = {};

    const recursiveRoutes = useCallback((list:IRouteProps[], previousPathname?:string) => {

        list.forEach(({ routes, as, name, path, ...rest }) => {

            const customPath = `${[ previousPathname, path !== '*' ? path : '/' ].join('/').replace(/(\/+)/g, '/')}`;
            
            if (name) {    

                const As = as || Route;

                routesList[name] = <As {...rest} key={path} path={customPath} />;
            }

            if (routes) {
                
                routesList = {
                    ...routesList,
                    ...recursiveRoutes(routes, customPath)
                };
            }
        });

        return routesList;
    }, [ routes ]);

    return recursiveRoutes(routes);
};

export default useMap;