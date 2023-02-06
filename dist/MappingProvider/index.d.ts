import React from 'react';
import { IMappingProvider } from './interfaces';
import { IRouteProps } from '../useRoute/interfaces';
export declare const useMappingContext: () => Record<string, React.ReactElement<IRouteProps, string | React.JSXElementConstructor<any>>>;
/**
 * Contexto do agrupador
 */
declare const MappingProvider: {
    ({ children, ...rest }: IMappingProvider): JSX.Element;
    displayName: string;
};
export default MappingProvider;
