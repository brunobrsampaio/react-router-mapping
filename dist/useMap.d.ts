import React from 'react';
import { RouteProps } from 'react-router-dom';
import { IRouteProps } from './useRoute/interfaces';
declare const useMap: (routes: IRouteProps[]) => Record<string, React.ReactElement<RouteProps, string | React.JSXElementConstructor<any>>>;
export default useMap;
