'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouterDom = require('react-router-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var MappingContext = /*#__PURE__*/React.createContext({});
var useMappingContext = function useMappingContext() {
  return React.useContext(MappingContext);
};
var MappingProvider = function MappingProvider(_ref) {
  var children = _ref.children,
    routes = _ref.routes;
  var value = React.useMemo(function () {
    if (Array.isArray(routes)) {
      var mapRoutes = new Map();
      routes.forEach(function (map) {
        map.forEach(function (route, name) {
          if (!mapRoutes.has(name)) {
            mapRoutes.set(name, route);
          } else {
            console.warn("A route named '".concat(name, "' has been duplicated in this <MappingProvider> instance"));
          }
        });
      });
      return mapRoutes;
    }
    return routes;
  }, [routes]);
  return /*#__PURE__*/React__default["default"].createElement(MappingContext.Provider, {
    value: value
  }, children);
};

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

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var toPrimitive = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var toPropertyKey = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];

function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var defineProperty = createCommonjsModule(function (module) {
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
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

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var lastParamExp = new RegExp('\\:[^\\:].\\?$', 'g');
var useRoute = function useRoute() {
  var routes = useMappingContext();
  invariant_1(routes.size, 'You should not use "useRoute" outside a <MappingProvider>');
  var routeParams = reactRouterDom.useParams();
  //
  var route = React.useCallback(function (name, params) {
    if (!name) {
      throw '\'Name\' argument not reported';
    }
    if (routes.size) {
      var _route = routes.get(name);
      if (_route) {
        var path = _route.path;
        if (path) {
          params = _objectSpread$1(_objectSpread$1({}, routeParams), params);
          for (var param in params) {
            if (param !== '*') {
              var regExp = new RegExp("(\\:".concat(param, "\\??)"), 'g');
              path = path.replace(regExp, String(params[param]));
            }
          }
          return path.replace(lastParamExp, '');
        }
      }
    }
    return '';
  }, [routes, routeParams]);
  //
  var all = React.useCallback(function () {
    var list = {};
    routes.forEach(function (route, name) {
      var path = route.path,
        label = route.label;
      var pathname = path;
      for (var param in routeParams) {
        if (param !== '*') {
          var regExp = new RegExp("(\\:".concat(param, "\\??)"), 'g');
          pathname = pathname.replace(regExp, String(routeParams[param]));
        }
      }
      list[name] = {
        name: name,
        label: label,
        path: pathname.replace(lastParamExp, '')
      };
    });
    return list;
  }, [routes]);
  return {
    route: route,
    all: all
  };
};

var useBreadcrumb = function useBreadcrumb() {
  var routes = useMappingContext();
  invariant_1(routes.size, 'You should not use \'useBreadcrumb\' outside a <MappingProvider>');
  var _useLocation = reactRouterDom.useLocation(),
    pathname = _useLocation.pathname;
  var breadcrumb = React.useMemo(function () {
    var list = [];
    routes.forEach(function (route, name) {
      var path = route.path,
        label = route.label;
      if (path && path.length && path !== '/') {
        var match = reactRouterDom.matchPath({
          path: path,
          end: false
        }, pathname);
        if (match) {
          list.push({
            name: name,
            path: match.pathname,
            label: label
          });
        }
      }
    });
    return list;
  }, [routes, pathname]);
  return breadcrumb;
};

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

var _excluded = ["name", "label", "path", "routes"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var useMap = function useMap(routes) {
  var listRoutes = new Map();
  var recursiveRoutes = function recursiveRoutes(list, previousPath) {
    var childRoutes = [];
    list.forEach(function (_ref) {
      var name = _ref.name,
        label = _ref.label,
        path = _ref.path,
        routes = _ref.routes,
        rest = _objectWithoutProperties(_ref, _excluded);
      var nestedPath = [previousPath, path].filter(Boolean).join('/').replace(/(\/+)/g, '/');
      if (!(path !== null && path !== void 0 && path.includes('*')) && name) {
        if (!listRoutes.has(name)) {
          listRoutes.set(name, {
            name: name,
            label: label,
            path: nestedPath
          });
        } else {
          console.warn("A route named '".concat(name, "' has been duplicated in this 'useMap' instance"));
        }
      }
      childRoutes.push( /*#__PURE__*/React.cloneElement( /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Route, null), _objectSpread({
        key: nestedPath,
        path: nestedPath
      }, rest), routes && recursiveRoutes(routes, nestedPath)));
    });
    return childRoutes;
  };
  return [recursiveRoutes(routes), listRoutes];
};

exports.MappingProvider = MappingProvider;
exports.useBreadcrumb = useBreadcrumb;
exports.useMap = useMap;
exports.useRoute = useRoute;
//# sourceMappingURL=index.cjs.js.map
