import { matchPath, useLocation } from 'react-router-dom';
import { useMappingContext } from '../MappingProvider';

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */
const useBreadcrumb = () => {

    const routes = useMappingContext();
    const { pathname } = useLocation();
    const breadcrumb = [];

    for (const route in routes) {

        const { props : { path, label } } = routes[route];

        const match = matchPath(pathname, { path });

        if (match) {

            const { url } = match;

            breadcrumb.push({ path : url, label });
        }
    }

    return {
        breadcrumb
    };
};

export default useBreadcrumb;