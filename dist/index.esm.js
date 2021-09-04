import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useContext, createContext, useCallback } from 'react';
import { useLocation, matchPath, Route } from 'react-router-dom';
import _extends from '@babel/runtime/helpers/extends';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var MappingContext = /*#__PURE__*/createContext(false);
var useMappingContext = function useMappingContext() {
  return useContext(MappingContext);
};
/**
 * Contexto do agrupador
 */

var MappingProvider = function MappingProvider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return /*#__PURE__*/React.createElement(MappingContext.Provider, {
    value: _objectSpread({}, rest)
  }, children);
};

MappingProvider.displayName = 'MappingProvider';

/**
 * Hook customizado para uso das rotas mapeadas
 */

var useRoute = function useRoute() {
  var routes = useMappingContext();
  var lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');
  /**
  * Resgata uma rota em especifica quando o arumento "name" for informado
  * 
  * @param {String} name - Chave de identificação da rota
  * @param {Object} params - Objeto de parâmetros para substituição nas rotas
  */

  var route = useCallback(function (name, params) {
    if (!name) {
      throw '\'Name\' argument not reported';
    }

    if (Object.keys(routes).length) {
      if (routes[name]) {
        var path = routes[name].props.path;
        var pathname = path[0];

        for (var param in params) {
          var regExp = new RegExp("(\\:".concat(param, "\\??)"), 'g');
          pathname = pathname.replace(regExp, params[param]);
        }

        return pathname.replace(lastParamExp, '');
      }
    }

    return '';
  }, [routes]);
  /**
  * Lista todas as rotas da aplicação
  */

  var all = useCallback(function () {
    var list = {};

    for (var route in routes) {
      var _routes$route$props = routes[route].props,
          path = _routes$route$props.path,
          label = _routes$route$props.label;

      if (path.length) {
        list[route] = {
          label: label,
          path: path[0].replace(lastParamExp, '')
        };
      }
    }

    return list;
  }, [routes]);
  return {
    route: route,
    all: all
  };
};

/**
 * Hook customizado para o usuo de um bread crumb em conjunto com o mapeador
 */

var useBreadcrumb = function useBreadcrumb() {
  var routes = useMappingContext();

  var _useLocation = useLocation(),
      pathname = _useLocation.pathname;

  var breadcrumb = [];

  for (var route in routes) {
    var _routes$route$props = routes[route].props,
        path = _routes$route$props.path,
        label = _routes$route$props.label;
    var match = matchPath(pathname, {
      path: path
    });

    if (match) {
      var url = match.url;
      breadcrumb.push({
        path: url,
        label: label
      });
    }
  }

  return {
    breadcrumb: breadcrumb
  };
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useMap = function useMap(routes) {
  var recursiveRoutes = useCallback(function (list, lastPathname) {
    var routesList = {};
    list.forEach(function (_ref) {
      var routes = _ref.routes,
          rest = _objectWithoutProperties(_ref, ["routes"]);

      rest.path = rest.path !== '*' ? Array.of(rest.path).flat().map(function (item) {
        return "".concat([lastPathname, item].join('/').replace(/(\/+)/g, '/'));
      }).filter(function (item) {
        return item;
      }) : '';

      if (rest.name && !routesList[rest.name]) {
        var As = rest.as || Route;
        routesList[rest.name] = /*#__PURE__*/React.createElement(As, _extends({
          key: "".concat(rest.name || rest.path[0])
        }, rest));
      }

      if (routes) {
        routesList = _objectSpread$1(_objectSpread$1({}, routesList), recursiveRoutes(routes, rest.path));
      }
    });
    return routesList;
  }, [routes]);
  return recursiveRoutes(routes);
};

export { MappingProvider, useBreadcrumb, useMap, useRoute };
