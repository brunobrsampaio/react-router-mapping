import React, { Fragment, createContext, useContext, useEffect, useState, useRef } from 'react';
import { matchPath, useLocation, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const MappingContext = createContext(false);
MappingContext.displayName = 'MappingContext';

/**
 * Contexto do agrupador
 */
const MappingProvider = ({ children, ...rest }) => {

	const routes = useRef({}).current;
	const groups = useRef([]).current;

	const [ update, setUpdate ] = useState(false);

	useEffect(() => {

		if (Object.keys(routes).length) {

			setUpdate(!update);
		}
	}, []);

	return (
		<MappingContext.Provider value={{ routes, groups, ...rest }}>
			{ children }
		</MappingContext.Provider>
	);
};

const Mapping = ({ children }) => {

	return (
		<MappingProvider>
			<MappingContext.Consumer>
				{({ groups }) => (
					<>
						{
							groups.length ? (
								<Switch>
									{ groups }
								</Switch>
							) : (
								<Grouping prefix="/">
									{ children }
								</Grouping>
							)
						}
					</>
				)}
			</MappingContext.Consumer>
		</MappingProvider>
	);
};

Mapping.displayName = 'Mapping';

/**
 * Agrupador de rotas
 */
const GroupingContext = createContext({ prefixes : [] });
GroupingContext.displayName = 'GroupingContext';

const GroupingProvider = ({ children, ...rest }) => {

	return (
		<GroupingContext.Provider value={{ ...rest }}>
			{ children }
		</GroupingContext.Provider>
	);
};

const Grouping = ({ children, prefix, layout }) => {

	const context = useContext(MappingContext);

	invariant(context, 'You should not use <Grouping> outside a <Mapping>');

	const { prefixes, groupLayout } = useContext(GroupingContext);

	const Layout = layout || groupLayout || Fragment;

	const groupRoutes = useRef([]).current;

	useEffect(() => {

		const groupPath = [...prefixes, prefix].join('/').replace(/(\/+)/g, '/');

		context.groups.push(
			<Route key={groupPath} path={groupPath}>
				<Layout>
					<Switch>
						{ Object.values(groupRoutes) }
					</Switch>
				</Layout>
			</Route>
		);
	}, []);
	
	return (
		<GroupingProvider {...{ prefixes : [...prefixes, `/${prefix}`], groupRoutes, groupLayout : Layout }}>
			{ children }
		</GroupingProvider>
	);
};

Grouping.propTypes = {
	/**
	 * Caminho de prefixação usado nas rotas internas do agrupador 
	 */
	prefix : PropTypes.string.isRequired,
	/**
	 * Layout do agrupador em questão
	 */
	layout : PropTypes.elementType
};

Grouping.defaultProps = {
	prefix : ''
};

Grouping.displayName = 'Grouping';

/**
 * Componente espelho de "Route", com novos métodos complementares
 */
const MapRoute = ({ children, name, component, render, as, ...rest }) => {

	const context = useContext(MappingContext);

	invariant(context, 'You should not use <MapRoute> outside a <Mapping>');

	const { prefixes, groupRoutes } = useContext(GroupingContext);

	useEffect(() => {

		const path = Array.of(rest.path).flat().map((item) => {

			return item ? `${[...prefixes, item].join('/').replace(/(\/+)/g, '/')}` : null;
		}).filter((item) => item);

		const As = as || Route;

		const route = (
			<As {...rest} key={path} name={name} path={path.length ? path : null} render={() => {

				if (children) {
		
					return children;
				}
		
				const Component = component || render;
		
				return <Component />;
			}} />
		);

		if (groupRoutes) {

			groupRoutes.push(route);
		}

		if (name) {

			context.routes[name] = route;
		}
	}, []);

	return null;
};

MapRoute.propTypes = {
	/**
	 * Chave de identificação da rota
	 */
	name : PropTypes.string,
	/**
	 * Texto utilizado para a utilização do breadcrump
	 */
	label : PropTypes.string,
	/**
	 * Elemento exclusivo para a utilização da biblioteca "react-router-authenticator"
	 */
	as : PropTypes.elementType,
	...Route.propTypes
};

MapRoute.defaultProps = {
	...Route.defaultProps
};

MapRoute.displayName = 'MapRoute';

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
			
			if (routes[name]) {

				const { props } = routes[name];
	
				let pathname = props.path[0];
		
				for (const param in params) {
	
					const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
	
					pathname = pathname.replace(regExp, params[param]);
				}
	
				return pathname.replace(lastParamExp, '');
			}
		}

		return '';
	};

	/**
	 * Lista todas as rotas da aplicação
	 */
	const all = () => {

		const list = {};

		for (var route in routes) {
			
			const { props } = routes[route];

			if (props.path.length) {

				if (!list[route]) {

					list[route] = {
						label : null
					};
				}

				list[route].label 	= props.label;
				list[route].path 	= props.path[0].replace(lastParamExp, '');
			}
		}

		return list;
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

		const { props } = routes[route];

		const { path, label } = props;

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

export {
	Mapping,
	Grouping,
	MapRoute,
	useRoute,
	useBreadcrumb
};