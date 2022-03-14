import React from 'react';
import { RouteProps } from 'react-router';
import { IRouteComponent } from './useRoute';
declare const useMap: (routes: IRouteComponent[]) => Record<string, React.ReactElement<RouteProps<string, {
    [x: string]: string | undefined;
}>, string | React.JSXElementConstructor<any>>>;
export default useMap;
