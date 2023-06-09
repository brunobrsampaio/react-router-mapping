export interface IRouteMap {
    name: string;
    path: string;
    label?: string;
}
export type IUseMap = [
    unknown[],
    ReadonlyMap<string, IRouteMap>
];
