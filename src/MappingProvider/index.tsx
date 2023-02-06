import React, { createContext, useContext } from 'react';

// Interfaces
import { IMappingProvider } from './interfaces';
import { IRouteProps } from '../useRoute/interfaces';

const MappingContext = createContext<Record<string, React.ReactElement<IRouteProps>>>({});

export const useMappingContext = () => useContext(MappingContext);

/**
 * Contexto do agrupador
 */
const MappingProvider = ({ children, ...rest }:IMappingProvider) => (
    <MappingContext.Provider value={{ ...rest }}>
        { children }
    </MappingContext.Provider>
);

MappingProvider.displayName = 'MappingProvider';

export default MappingProvider;