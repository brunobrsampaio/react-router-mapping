import React, { createContext, useContext, useState, memo, useEffect } from 'react';
import { matchPath, useLocation, useHistory, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const MappingContext		= createContext(false);
MappingContext.displayName	= 'MappingContext';

const GroupingContext		= createContext({ prefixes : [], prefix : '' });
GroupingContext.displayName = 'GroupingContext';

const listRoutes	= {};
let currentRoute	= '';

/**
 * Contexto do agrupador
 */
const Mapping = memo(({ children, notFoundRedirect }) => {

	const [ routes, setRoutes ] = useState({});
	const { pathname } 	= useLocation();
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

		setRoutes(listRoutes);

		redirect();
	}, []);

	return (
		<MappingContext.Provider value={{ routes }}>
			<Grouping>
				{ children }
			</Grouping>
		</MappingContext.Provider>
	);
});

Mapping.propTypes = {
	/**
	 * Caso a rota informada na URL não exista, o valor dessa propriedade deve ser utilizado para um redirecionamento
	 */
	notFoundRedirect : PropTypes.string
};

/**
 * Agrupador de rotas
 */
const Grouping = memo(({ children, prefix }) => {

	const { prefixes } = useContext(GroupingContext);

	return (
		<MappingContext.Consumer>
			{(context) => {

				invariant(context, 'You should not use <Grouping> outside a <Mapping>');

				return (
					<GroupingContext.Provider value={{ prefixes : [...prefixes, prefix], prefix }}>
						{ children }
					</GroupingContext.Provider>
				);
			}}
		</MappingContext.Consumer>
	);
});

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

	return (
		<GroupingContext.Consumer>
			{(context) => {

				invariant(context, 'You should not use <MapRoute> outside a <Mapping>');

				const path = `${['/', ...context.prefixes, rest.path].join('/').replace(/(\/+)/g, '/')}`;

				if (name) {

					listRoutes[name] = !label ? path : { path, label };
				}

				const Component = as || Route;

				return <Component {...rest} path={path} render={() => {

					currentRoute = path;

					if (children) {

						return children;
					}

					const Component = component || render;

					return <Component />;
				}} />;
			}}
		</GroupingContext.Consumer>
	);
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

		for (var route in routes) {

			if (routes[route] instanceof Object) {

				if (routes[route].path) {
					
					routes[route].path = routes[route].path.replace(lastParamExp, '');
				}
			} else {

				routes[route] = routes[route].replace(lastParamExp, '');
			}
		}

		return routes;
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