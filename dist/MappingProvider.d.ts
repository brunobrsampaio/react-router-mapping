import React from 'react';
import { IRouteComponent } from './useRoute';
export declare const useMappingContext: () => Record<string, React.ReactElement<IRouteComponent, string | React.JSXElementConstructor<any>>>;
interface Props {
    children: React.ReactNode;
}
/**
 * Contexto do agrupador
 */
declare const MappingProvider: {
    ({ children, ...rest }: Props): JSX.Element;
    displayName: string;
};
export default MappingProvider;
