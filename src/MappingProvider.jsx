import React, { createContext, useContext } from 'react';

const MappingContext = createContext(false);

export const useMappingContext = () => useContext(MappingContext);

/**
 * Contexto do agrupador
 */
const MappingProvider = ({ children, ...rest }) => {

    return (
        <MappingContext.Provider value={{ ...rest }}>
            { children }
        </MappingContext.Provider>
    );
};

MappingProvider.displayName = 'MappingProvider';

export default MappingProvider;