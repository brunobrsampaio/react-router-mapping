import React, { isValidElement } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import { useMappingContext } from './Mapping';
import { useGroupingContext } from './Grouping';

/**
 * Componente espelho de "Route", com novos métodos complementares
 */
const MapRoute = ({ children, as, ...rest }) => {

    const { routes, elements } = useMappingContext();

    invariant(routes, 'You should not use <MapRoute> outside a <Mapping>');

    const { prefixes } = useGroupingContext();

    rest.path = Array.of(rest.path).flat().map((item) => {

        return item !== '*' ? `${[ ...prefixes, item ].join('/').replace(/(\/+)/g, '/')}` : item;
    }).filter((item) => item);
        
    if (!routes[rest.name]) {

        if (rest.name) {
    
            routes[rest.name] = rest;
        }

        const As = as || Route;

        elements.push(
            <As {...rest} key={`${rest.name || rest.path[0]}`}>
                { isValidElement(children) && children }
            </As>
        );
    }

    return null;
};

MapRoute.propTypes = {
    /**
	 * Chave de identificação da rota
	 */
    name : PropTypes.string,
    /**
	 * Texto utilizado para a utilização do breadcrump
	 */
    label : PropTypes.string,
    /**
	 * Elemento exclusivo para a utilização da biblioteca "react-router-authenticator"
	 */
    as : PropTypes.elementType,
    ...Route.propTypes
};

MapRoute.defaultProps = {
    ...Route.defaultProps
};

MapRoute.displayName = 'MapRoute';

export default MapRoute;