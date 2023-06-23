/// <reference types="react" />
import { IMappingProvider, IMappingContext } from './interfaces';
export declare const useMappingContext: () => IMappingContext;
declare const MappingProvider: ({ children, routes }: IMappingProvider) => JSX.Element;
export default MappingProvider;
