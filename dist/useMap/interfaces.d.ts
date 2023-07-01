/// <reference types="react" />
export interface IRouteMap {
    name: string;
    path: string;
    label?: string;
}
export type IUseMap = [
    React.ReactNode[],
    ReadonlyMap<string, IRouteMap>
];
