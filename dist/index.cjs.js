'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var PropTypes = require('prop-types');
var invariant = require('invariant');
var _extends = require('@babel/runtime/helpers/extends');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var invariant__default = /*#__PURE__*/_interopDefaultLegacy(invariant);
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

  var routes = React.useRef({}).current;
  var elements = React.useRef([]).current;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray__default['default'](_useState, 2),
      update = _useState2[0],
      setUpdate = _useState2[1];

  React.useEffect(function () {
    setUpdate(!update);
  }, []);
  return /*#__PURE__*/React__default['default'].createElement(MappingContext.Provider, {
    value: _objectSpread({
      routes: routes,
      elements: elements
    }, rest)
  }, children);
};

var Mapping = function Mapping(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React__default['default'].createElement(MappingProvider, null, /*#__PURE__*/React__default['default'].createElement(MappingContext.Consumer, null, function (_ref3) {
    var elements = _ref3.elements;
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, !elements.length ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, children) : /*#__PURE__*/React__default['default'].createElement(reactRouterDom.Switch, null, elements));
  }));
};

Mapping.displayName = 'Mapping';

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Agrupador de rotas
 */

var GroupingContext = /*#__PURE__*/React.createContext({
  prefixes: []
});
var useGroupingContext = function useGroupingContext() {
  return React.useContext(GroupingContext);
};

var GroupingProvider = function GroupingProvider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties__default['default'](_ref, ["children"]);

  return /*#__PURE__*/React__default['default'].createElement(GroupingContext.Provider, {
    value: _objectSpread$1({}, rest)
  }, children);
};

var Grouping = function Grouping(_ref2) {
  var children = _ref2.children,
      prefix = _ref2.prefix;
  var context = useMappingContext();
  invariant__default['default'](context, 'You should not use <Grouping> outside a <Mapping>');

  var _useGroupingContext = useGroupingContext(),
      prefixes = _useGroupingContext.prefixes;

  return /*#__PURE__*/React__default['default'].createElement(GroupingProvider, {
    prefixes: [].concat(_toConsumableArray__default['default'](prefixes), ["/".concat(prefix)])
  }, children);
};

Grouping.propTypes = {
  /**
  * Caminho de prefixação usado nas rotas internas do agrupador 
  */
  prefix: PropTypes__default['default'].string.isRequired
};
Grouping.defaultProps = {
  prefix: ''
};
Grouping.displayName = 'Grouping';

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Componente espelho de "Route", com novos métodos complementares
 */

var MapRoute = function MapRoute(_ref) {
  var children = _ref.children,
      as = _ref.as,
      rest = _objectWithoutProperties__default['default'](_ref, ["children", "as"]);

  var _useMappingContext = useMappingContext(),
      routes = _useMappingContext.routes,
      elements = _useMappingContext.elements;

  invariant__default['default'](routes, 'You should not use <MapRoute> outside a <Mapping>');

  var _useGroupingContext = useGroupingContext(),
      prefixes = _useGroupingContext.prefixes;

  rest.path = Array.of(rest.path).flat().map(function (item) {
    return item !== '*' ? "".concat([].concat(_toConsumableArray__default['default'](prefixes), [item]).join('/').replace(/(\/+)/g, '/')) : item;
  }).filter(function (item) {
    return item;
  });

  if (!routes[rest.name]) {
    if (rest.name) {
      routes[rest.name] = rest;
    }

    var As = as || reactRouterDom.Route;
    elements.push( /*#__PURE__*/React__default['default'].createElement(As, _extends__default['default']({}, rest, {
      key: "".concat(rest.name || rest.path[0])
    }), /*#__PURE__*/React.isValidElement(children) && children));
  }

  return null;
};

MapRoute.propTypes = _objectSpread$2({
  /**
  * Chave de identificação da rota
  */
  name: PropTypes__default['default'].string,

  /**
  * Texto utilizado para a utilização do breadcrump
  */
  label: PropTypes__default['default'].string,

  /**
  * Elemento exclusivo para a utilização da biblioteca "react-router-authenticator"
  */
  as: PropTypes__default['default'].elementType
}, reactRouterDom.Route.propTypes);
MapRoute.defaultProps = _objectSpread$2({}, reactRouterDom.Route.defaultProps);
MapRoute.displayName = 'MapRoute';

/**
 * Hook customizado para uso das rotas mapeadas
 */

var useRoute = function useRoute() {
  var _useMappingContext = useMappingContext(),
      routes = _useMappingContext.routes;

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
        var path = routes[name].path;
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
      var _routes$route = routes[route],
          path = _routes$route.path,
          label = _routes$route.label;

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
  var _useMappingContext = useMappingContext(),
      routes = _useMappingContext.routes;

  var _useLocation = reactRouterDom.useLocation(),
      pathname = _useLocation.pathname;

  var breadcrumb = [];

  for (var route in routes) {
    var _routes$route = routes[route],
        path = _routes$route.path,
        label = _routes$route.label;
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

exports.Grouping = Grouping;
exports.MapRoute = MapRoute;
exports.Mapping = Mapping;
exports.useBreadcrumb = useBreadcrumb;
exports.useRoute = useRoute;
