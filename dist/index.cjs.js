'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var defineProperty = createCommonjsModule(function (module) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty);

var objectWithoutPropertiesLoose = createCommonjsModule(function (module) {
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var objectWithoutProperties = createCommonjsModule(function (module) {
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _objectWithoutProperties = /*@__PURE__*/getDefaultExportFromCjs(objectWithoutProperties);

var _excluded$1 = ["children"];

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MappingContext = /*#__PURE__*/React.createContext({});
var useMappingContext = function useMappingContext() {
  return React.useContext(MappingContext);
};
/**
 * Contexto do agrupador
 */

var MappingProvider = function MappingProvider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, _excluded$1);

  return /*#__PURE__*/React__default["default"].createElement(MappingContext.Provider, {
    value: _objectSpread$2({}, rest)
  }, children);
};

MappingProvider.displayName = 'MappingProvider';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Hook customizado para uso das rotas mapeadas
 */

var useRoute = function useRoute() {
  var routes = useMappingContext();
  invariant_1(Object.values(routes).length, 'You should not use "useRoute" outside a <MappingProvider>');
  var routeParams = reactRouter.useParams();
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
        var pathname = String(path || '');
        params = _objectSpread$1(_objectSpread$1({}, routeParams), params);

        for (var param in params) {
          var regExp = new RegExp("(\\:".concat(param, "\\??)"), 'g');
          pathname = pathname.replace(regExp, params[param]);
        }

        return pathname.replace(lastParamExp, '');
      }
    }

    return '';
  }, [routes, routeParams]);
  /**
   * Lista todas as rotas da aplicação
   */

  var all = React.useCallback(function () {
    var list = {};

    for (var _route in routes) {
      var _routes$_route$props = routes[_route].props,
          path = _routes$_route$props.path,
          label = _routes$_route$props.label;

      if (path && path.length) {
        list[_route] = {
          name: _route,
          label: label,
          path: String(path || '').replace(lastParamExp, '')
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
  invariant_1(Object.values(routes).length, 'You should not use "useBreadcrumb" outside a <MappingProvider>');

  var _useLocation = reactRouter.useLocation(),
      pathname = _useLocation.pathname;

  var breadcrumb = React.useMemo(function () {
    var list = [];

    for (var route in routes) {
      var _routes$route$props = routes[route].props,
          path = _routes$route$props.path,
          label = _routes$route$props.label;

      if (label && path && path.length && path !== '/') {
        var match = reactRouter.matchPath(pathname, {
          strict: true,
          path: String(path || '')
        });

        if (match) {
          list.push({
            name: route,
            path: match.path,
            label: label
          });
        }
      }
    }

    return list;
  }, [routes, pathname]);
  return breadcrumb;
};

var _excluded = ["routes", "as", "name", "path"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var useMap = function useMap(routes) {
  var routesList = {};
  var recursiveRoutes = React.useCallback(function (list, lastPathname) {
    list.forEach(function (_ref) {
      var routes = _ref.routes,
          as = _ref.as,
          name = _ref.name,
          path = _ref.path,
          rest = _objectWithoutProperties(_ref, _excluded);

      var paths = Array.of(path).flat();
      var names = Array.of(name).flat();
      var padLength = Math.max(names.length, paths.length);
      paths = Array.from(_objectSpread(_objectSpread({}, paths), {}, {
        length: padLength
      }));
      names = Array.from(_objectSpread(_objectSpread({}, names), {}, {
        length: padLength
      }));

      for (var i = 0; i < padLength; i++) {
        var customPath = "".concat([lastPathname, paths[i]].join('/').replace(/(\/+)/g, '/'));

        if (names[i]) {
          var As = as || reactRouter.Route;
          routesList[names[i]] = /*#__PURE__*/React__default["default"].createElement(As, _objectSpread(_objectSpread({}, rest), {}, {
            key: names[i],
            path: customPath
          }));
        }

        if (routes) {
          routesList = _objectSpread(_objectSpread({}, routesList), recursiveRoutes(routes, customPath));
        }
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
