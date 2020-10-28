/* eslint-disable react/prop-types */

import React, { Children, isValidElement, cloneElement, createContext, useState, useContext, useEffect, memo, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Context 		= createContext({});
const listRoutes 	= {};

/**
 * Contexto do agrupador
 */
const Mapping = ({ children }) => {

	const [ routes, setRoutes ] = useState({});

	return (
		<Context.Provider value={{ routes, setRoutes }}>
			<Grouping>
				{ children }	
			</Grouping>
		</Context.Provider>
	);
};

/**
 * Agrupador de rotas
 * 
 * @param {String} props.path - Caminho de prefixação usado nas rotas internas do agrupador 
 */
const Grouping = memo(({ children, path }) => {

	const { setRoutes } = useContext(Context);

	const groupPath = path;

	useEffect(() => {

		setRoutes(listRoutes);
	}, []);

	return useMemo(() => Children.toArray(children).map((item) => {
		
		if (isValidElement(item)) {

			const { props } = item;
			const { path, label, name } = props;
			
			if (path) {

				const newPath = [ groupPath, path ].join('/').replace(/(\/+)/g, '/');

				if (name) {

					listRoutes[name] = !label ? newPath : {
						path	: newPath,
						label 	: label
					};
				}

				return cloneElement(item, { ...props, path : newPath });
			}
		}
	}), []);
});

Grouping.propTypes = {
	path : PropTypes.string
};

Grouping.defaultProps = {
	path : ''
};

/**
 * Hook customizado para uso das rotas mapeadas
 */
const useRoute = () => {
	
	const { routes } = useContext(Context);

	/**
	 * Resgata uma listRoutesa de rotas ou uma rota em especifica se o arumento "name" for preenchido
	 * 
	 * @param {String} name - Chave de identificação da rota
	 * @param {Object} params - Objeto de parâmetros para substituição nas rotas
	 */
	const route = (name, params) => {

		if (!name) {

			return routes;
		}

		if (Object.keys(routes).length) {

			const location = routes[name];

			const { path } = location;
	
			if (!path) {
	
				return '';
			}
	
			let pathname = path || location;
	
			for (const param in params) {
	
				const regExp = new RegExp(`(\\:${param}\\??)`, 'g');
	
				pathname = pathname.replace(regExp, params[param]);
			}
	
			return pathname;
		}

		return '';
	};

	return {
		route
	};
};

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */
const useBreadCrumb = () => {
	
	const { routes } = useContext(Context);
	const { pathname } = useLocation();
	const breadCrumb = [];

	for (const route in routes) {

		const { path, label } = routes[route];

		const match = matchPath(pathname, {
			path : path
		});

		if (match) {

			const { url } = match;

			breadCrumb.push({ url, label });
		}
	}

	return {
		breadCrumb
	};
};

export {
	Mapping,
	Grouping,
	useRoute,
	useBreadCrumb
};