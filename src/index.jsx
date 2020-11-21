/* eslint-disable react/prop-types */

import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const Context 		= React.createContext(false);
const listRoutes 	= {};

/**
 * Contexto do agrupador
 */
class Mapping extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			routes : {}
		};

		this.update = (routes) => {

			return this.setState({
				...this.state.routes,
				routes : routes
			});
		};
	}

	render () {

		const { props, state, update } = this;
		const { children }	= props;
		const { routes } 	= state;

		return (
			<Context.Provider value={{ routes, update }}>
				<Grouping>
					{ children }
				</Grouping>
			</Context.Provider>
		);
	}
}

/**
 * Agrupador de rotas
 * 
 * @param {String} props.path - Caminho de prefixação usado nas rotas internas do agrupador 
 */
class Grouping extends React.PureComponent {

	constructor (props) {

		super(props);
	}

	static contextType = Context;

	componentDidMount () {

		const { update } = this.context;

		update(listRoutes);
	}

	render () {

		const { props } = this;
		const { children, path } = props;

		const groupPath = path;

		return (
			<Context.Consumer>
				{(context) => {

					invariant(context, 'You should not use <Grouping> outside a <Mapping>');

					return React.Children.toArray(children).map((item, key) => {

						if (React.isValidElement(item)) {

							const { path, label, name } = item.props;

							if (path) {

								const newPath = [ groupPath, path ].join('/').replace(/(\/+)/g, '/');

								if (name) {

									listRoutes[name] = !label ? newPath : {
										path	: newPath,
										label 	: label
									};
								}

								return React.cloneElement(item, { ...item.props, key, path : newPath });
							}
						}

						return item;
					});	
				}}
			</Context.Consumer>
		);
	}
}

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
	
	const { routes } = React.useContext(Context);

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
	
			return pathname;
		}

		return '';
	};

	/**
	 * Lista todas as rotas da aplicação
	 */
	const all = () => {

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
	
	const { routes } = React.useContext(Context);
	const { pathname } = useLocation();
	const breadcrumb = [];

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