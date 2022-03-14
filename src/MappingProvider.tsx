import React, { createContext, useContext } from 'react';
import { IRouteComponent } from './useRoute';

const MappingContext = createContext<Record<string, React.ReactElement<IRouteComponent>>>({});

export const useMappingContext = () => useContext(MappingContext);

interface Props {
    children:React.ReactNode;
}

/**
 * Contexto do agrupador
 */
const MappingProvider = ({ children, ...rest }:Props) => (
    <MappingContext.Provider value={{ ...rest }}>
        { children }
    </MappingContext.Provider>
);

MappingProvider.displayName = 'MappingProvider';

export default MappingProvider;