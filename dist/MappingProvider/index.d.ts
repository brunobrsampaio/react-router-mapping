import React from 'react';
import { IMappingProvider, IMappingContext } from './interfaces';
export declare const useMappingContext: () => IMappingContext;
declare const MappingProvider: ({ children, routes }: IMappingProvider) => React.JSX.Element;
export default MappingProvider;
