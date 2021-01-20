/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState, useEffect, memo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const Context 		= createContext(false);
const listRoutes 	= {};

/**
 * Contexto do agrupador
 */
const Mapping = memo(({ children }) => {

	const [ routes, setRoutes ] = useState({});

	return (
		<Context.Provider value={{ routes, setRoutes }}>
			<Grouping>
				{ children }
			</Grouping>
		</Context.Provider>
	);
});

/**
 * Agrupador de rotas
 * 
 * @param {String} props.prefix - Caminho de prefixação usado nas rotas internas do agrupador 
 */
const  Grouping = memo(({ children, prefix }) => {

	const { setRoutes } = useContext(Context);

	useEffect(() => {

		setRoutes(listRoutes);
	}, []);

	return (
		<Context.Consumer>
			{(context) => {

				invariant(context, 'You should not use <Grouping> outside a <Mapping>');

				return React.Children.toArray(children).map((item, key) => {

					if (React.isValidElement(item)) {

						const { path, label, name } = item.props;

						if (path) {

							const newPath = [ `/${prefix}`, path ].join('/').replace(/(\/+)/g, '/');

							if (name) {

								listRoutes[name] = !label ? newPath : {
									path	: newPath,
									label 	: label
								};
							}

							return React.cloneElement(item, { ...item.props, key, path : newPath });
						}
					}

					return !prefix ? item : React.cloneElement(item, { ...item.props, prefix : `${prefix}/${item.props.prefix}` });
				});	
			}}
		</Context.Consumer>
	);
});

Grouping.propTypes = {
	prefix : PropTypes.string
};

Grouping.defaultProps = {
	prefix : ''
};

/**
 * Hook customizado para uso das rotas mapeadas
 */
const useRoute = () => {
	
	const { routes } = useContext(Context);

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
	
	const { routes } 	= useContext(Context);
	const { pathname } 	= useLocation();
	const breadcrumb 	= [];

	for (const route in routes) {

		const { path, label } = routes[route];

		const match = matchPath(pathname, {
			path : path
		});

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
	useRoute,
	useBreadcrumb
};