import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { matchPath, useLocation, useHistory, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const MappingContext = createContext(false);
MappingContext.displayName = 'MappingContext';

const GroupingContext = createContext({ prefixes : [] });
GroupingContext.displayName = 'GroupingContext';

let listRoutes = {};
let currentRoute = {};

/**
 * Contexto do agrupador
 */
const Mapping = ({ children, notFoundRedirect }) => {

	const [ routes, setRoutes ] = useState({});
	const { pathname } = useLocation();
	const { push } = useHistory();

	/**
	 * Verifica se a rota informada, é igual a atual na listagem de rotas
	 */
	const redirect = () => {

		if (notFoundRedirect) {

			const match = matchPath(pathname, { path : currentRoute });

			if (!match.isExact) {
	
				push(notFoundRedirect);
			}
		}
	};

	useEffect(() => {

		setRoutes((old) => {

			return {
				...old,
				...listRoutes
			};
		});

		redirect();
	}, []);

	return useMemo(() => (
		<MappingContext.Provider value={{ routes }}>
			{ children }
		</MappingContext.Provider>
	), [ routes ]);
};

Mapping.propTypes = {
	/**
	 * Caso a rota informada na URL não exista, o valor dessa propriedade deve ser utilizado para um redirecionamento
	 */
	notFoundRedirect : PropTypes.string
};

/**
 * Agrupador de rotas
 */
const Grouping = ({ children, prefix }) => {

	const context = useContext(MappingContext);

	invariant(context, 'You should not use <Grouping> outside a <Mapping>');

	const { prefixes } = useContext(GroupingContext);

	return useMemo(() => (
		<GroupingContext.Provider value={{ prefixes : [...prefixes, prefix] }}>
			{ children }
		</GroupingContext.Provider>
	), []);
};

Grouping.propTypes = {
	/**
	 * Caminho de prefixação usado nas rotas internas do agrupador 
	 */
	prefix : PropTypes.string
};

Grouping.defaultProps = {
	prefix : ''
};

/**
 * Componente espelho de "Route", com novos métodos complementares
 */
const MapRoute = ({ children, name, label, component, render, as, ...rest }) => {

	const context = useContext(MappingContext);

	invariant(context, 'You should not use <MapRoute> outside a <Mapping>');

	const { prefixes } = useContext(GroupingContext);

	return useMemo(() => {

		const path = Array.of(rest.path).flat().map((item) => {

			return `${['/', ...prefixes, item].join('/').replace(/(\/+)/g, '/')}`;
		});

		if (name) {

			listRoutes[name] = !label ? path[0] : { path : path[0], label };
		}

		const Component = as || Route;

		return <Component {...rest} path={path} render={({ match }) => {

			currentRoute = match.path;

			if (children) {

				return children;
			}

			const Component = component || render;

			return <Component />;
		}} />;
	}, []);
};

MapRoute.propTypes = {
	/**
	 * Chave de identificação da rota
	 */
	name	: PropTypes.string,
	/**
	 * Texto utilizado para a utilização do breadcrump
	 */
	label	: PropTypes.string,
	/**
	 * Elemento exclusivo para a utilização da biblioteca "react-router-authenticator"
	 */
	as 		: PropTypes.elementType,
	...Route.propTypes
};

MapRoute.defaultProps = {
	...Route.defaultProps
};

/**
 * Hook customizado para uso das rotas mapeadas
 */
const useRoute = () => {
	
	const { routes } = useContext(MappingContext);

	const lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');

	/**
	 * Resgata uma rota em especifica quando o arumento "name" for informado
	 * 
	 * @param {String} name - Chave de identificação da rota
	 * @param {Object} params - Objeto de parâmetros para substituição nas rotas
	 */
	const route = (name, params) => {

		if (!name) {

			throw '\'Name\' argument not reported';
		}

		if (Object.keys(routes).length) {

			const location = routes[name];

			if (!location) {

				return '';
			}

			let pathname = location;
	
			if (location.path) {
	
				pathname = location.path;
			}
	
			for (const param in params) {

				const regExp = new RegExp(`(\\:${param}\\??)`, 'g');

				pathname = pathname.replace(regExp, params[param]);
			}

			return pathname.replace(lastParamExp, '');
		}

		return '';
	};

	/**
	 * Lista todas as rotas da aplicação
	 */
	const all = () => {

		const cloneRoutes = JSON.parse(JSON.stringify(routes));

		for (var route in cloneRoutes) {

			if (cloneRoutes[route] instanceof Object) {

				if (cloneRoutes[route].path) {
					
					cloneRoutes[route].path = cloneRoutes[route].path.replace(lastParamExp, '');
				}
			} else {

				cloneRoutes[route] = cloneRoutes[route].replace(lastParamExp, '');
			}
		}

		return cloneRoutes;
	};

	return {
		route,
		all
	};
};

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */
const useBreadcrumb = () => {
	
	const { routes } 	= useContext(MappingContext);
	const { pathname } 	= useLocation();
	const breadcrumb 	= [];

	for (const route in routes) {

		const { path, label } = routes[route];

		const match = matchPath(pathname, { path });

		if (match) {

			const { url } = match;

			breadcrumb.push({ url, label });
		}
	}

	return {
		breadcrumb
	};
};

export {
	Mapping,
	Grouping,
	MapRoute,
	useRoute,
	useBreadcrumb
};