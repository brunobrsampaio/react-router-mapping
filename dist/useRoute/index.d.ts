import { IRouteProps } from './interfaces';
/**
 * Hook customizado para uso das rotas mapeadas
 */
declare const useRoute: () => {
    route: (name: string, params?: Record<string, unknown>) => string;
    all: () => Record<string, IRouteProps>;
};
export default useRoute;
