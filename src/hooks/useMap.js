import React, { useCallback } from 'react';
import { Route } from 'react-router-dom';

const useMap = (routes) => {

    const recursiveRoutes = useCallback((list, lastPathname) => {

        let routesList = {};

        list.forEach(({ routes, ...rest }) => {

            rest.path = rest.path !== '*' ? Array.of(rest.path).flat().map((item) => {

                return `${[ lastPathname, item ].join('/').replace(/(\/+)/g, '/')}`;
            }).filter((item) => item) : '';

            if (rest.name && !routesList[rest.name]) {

                const As = rest.as || Route;
                
                routesList[rest.name] = <As key={`${rest.name || rest.path[0]}`} {...rest} />;
            }

            if (routes) {

                routesList = {
                    ...routesList,
                    ...recursiveRoutes(routes, rest.path)
                };
            }
        });

        return routesList;
    }, [ routes ]);

    return recursiveRoutes(routes);
};

export default useMap;