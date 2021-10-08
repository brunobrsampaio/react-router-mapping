import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useMappingContext } from '../MappingProvider';

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */
const useBreadcrumb = () => {

    const routes = useMappingContext();
    const { pathname } = useLocation();

    const breadcrumb = useMemo(() => {

        const list = [];

        for (const route in routes) {

            const { props : { path, label } } = routes[route];
            
            if (path.length) {
    
                const match = matchPath(pathname, { path, strict : true });
        
                if (match) {
        
                    const { url } = match;
        
                    list.push({ path : url, label });
                }
            }
        }

        return list;
    }, [ routes ]);

    return {
        breadcrumb
    };
};

export default useBreadcrumb;