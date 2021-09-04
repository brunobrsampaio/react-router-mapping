'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var _extends = require('@babel/runtime/helpers/extends');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var MappingContext = /*#__PURE__*/React.createContext(false);
var useMappingContext = function useMappingContext() {
  return React.useContext(MappingContext);
};
/**
 * Contexto do agrupador
 */

var MappingProvider = function MappingProvider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties__default['default'](_ref, ["children"]);

  return /*#__PURE__*/React__default['default'].createElement(MappingContext.Provider, {
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

  var route = React.useCallback(function (name, params) {
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

  var all = React.useCallback(function () {
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

  var _useLocation = reactRouterDom.useLocation(),
      pathname = _useLocation.pathname;

  var breadcrumb = [];

  for (var route in routes) {
    var _routes$route$props = routes[route].props,
        path = _routes$route$props.path,
        label = _routes$route$props.label;
    var match = reactRouterDom.matchPath(pathname, {
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

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useMap = function useMap(routes) {
  var recursiveRoutes = React.useCallback(function (list, lastPathname) {
    var routesList = {};
    list.forEach(function (_ref) {
      var routes = _ref.routes,
          rest = _objectWithoutProperties__default['default'](_ref, ["routes"]);

      rest.path = rest.path !== '*' ? Array.of(rest.path).flat().map(function (item) {
        return "".concat([lastPathname, item].join('/').replace(/(\/+)/g, '/'));
      }).filter(function (item) {
        return item;
      }) : '';

      if (rest.name && !routesList[rest.name]) {
        var As = rest.as || reactRouterDom.Route;
        routesList[rest.name] = /*#__PURE__*/React__default['default'].createElement(As, _extends__default['default']({
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

exports.MappingProvider = MappingProvider;
exports.useBreadcrumb = useBreadcrumb;
exports.useMap = useMap;
exports.useRoute = useRoute;
