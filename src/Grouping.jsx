import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import { useMappingContext } from './Mapping';

/**
 * Agrupador de rotas
 */
const GroupingContext = createContext({ prefixes : [] });

export const useGroupingContext = () => useContext(GroupingContext);

const GroupingProvider = ({ children, ...rest }) => {

    return (
        <GroupingContext.Provider value={{ ...rest }}>
            { children }
        </GroupingContext.Provider>
    );
};

const Grouping = ({ children, prefix }) => {

    const context = useMappingContext();

    invariant(context, 'You should not use <Grouping> outside a <Mapping>');

    const { prefixes } = useGroupingContext();

    return (
        <GroupingProvider {...{ prefixes : [ ...prefixes, `/${prefix}` ] }}>
            { children }
        </GroupingProvider>
    );
};

Grouping.propTypes = {
    /**
	 * Caminho de prefixação usado nas rotas internas do agrupador 
	 */
    prefix : PropTypes.string.isRequired,
};

Grouping.defaultProps = {
    prefix : ''
};

Grouping.displayName = 'Grouping';

export default Grouping;