import React, { useCallback } from 'react';
import { Route, RouteProps } from 'react-router';
import { IRouteComponent } from './useRoute';

const useMap = (routes:IRouteComponent[]) => {

    let routesList:Record<string, React.ReactElement<RouteProps>> = {};

    const recursiveRoutes = useCallback((list:IRouteComponent[], lastPathname?:string) => {

        list.forEach(({ routes, as, name, path, ...rest }) => {

            let paths = Array.of(path).flat();
            let names = Array.of(name).flat();

            const padLength = Math.max(names.length, paths.length);

            paths = Array.from({ ...paths, length : padLength });
            names = Array.from({ ...names, length : padLength });

            for (let i = 0; i < padLength; i++) {
                
                const customPath = `${[ lastPathname, paths[i] ].join('/').replace(/(\/+)/g, '/')}`;
                
                if (names[i]) {    
    
                    const As = as || Route;

                    routesList[names[i]] = <As {...rest} key={names[i]} path={customPath} />;
                }

                if (routes) {
                    
                    routesList = {
                        ...routesList,
                        ...recursiveRoutes(routes, customPath)
                    };
                }
            }
        });

        return routesList;
    }, [ routes ]);

    return recursiveRoutes(routes);
};

export default useMap;