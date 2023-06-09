/// <reference types="react" />
import { IRouteMap } from '../useMap/interfaces';
export type IMappingContext = ReadonlyMap<string, IRouteMap>;
export interface IMappingProvider {
    children: React.ReactNode;
    routes: ReadonlyMap<string, IRouteMap> | ReadonlyMap<string, IRouteMap>[];
}
