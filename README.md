# React Router Mapping

This library has as auxiliary tools the developers to have a better way to map, group and manage the routes of their applications.

# Before starting

This library works in conjunction with [React Router](https://reactrouter.com/web/guides/quick-start), using certain features that would not need to be rewritten. Therefore, carefully read each section of this document.

# Installation

```sh
npm install react-router-mapping
```

# How to use

```jsx
import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { MappingProvider, useMap } from 'react-router-mapping';

export default () => {

  const routes = useMap([
    {
      exact     : true,
      name      : 'home',
      path      : ['/', '/home'],
      label     : 'Home',
      component : lazy(() => import(/* webpackChunkName: 'Home' */'./Home'))
    },
    {
      exact     : true,
      name      : 'route-one',
      path      : '/route-one',
      label     : 'Route 1',
      component : lazy(() => import(/* webpackChunkName: 'route-one' */'./Route1'))
    },
    {
      exact     : true,
      name      : 'route-two',
      path      : '/route-two',
      label     : 'Route 2',
      component : lazy(() => import(/* webpackChunkName: 'route-two' */'./Route2')),
    },
    {
      path    : '/level-one',
      routes  : [
        {
          exact     : true,
          name      : 'route-three',
          path      : '/route-three',
          label     : 'Route 3',
          component : lazy(() => import(/* webpackChunkName: 'route-three' */'./Route3')),
        },
        {
          exact     : true,
          name      : 'route-four',
          path      : '/route-four',
          label     : 'Route 4',
          component : lazy(() => import(/* webpackChunkName: 'route-four' */'./Route4')),
        },
        {
          path    : '/level-two',
          routes  : [
            {
              exact     : true,
              name      : 'route-five',
              path      : '/route-five',
              label     : 'Route 5',
              component : () => <>Route 5</>
            },
            {
              exact     : true,
              name      : 'route-six',
              path      : '/route-six',
              label     : 'Route 6',
              component : () => <>Route 6</>
              routes    : [
                {
                  exact     : true,
                  name      : 'route-nested',
                  path      : '/route-nested/:id',
                  label     : 'Route Nested',
                  component : () => <>Route Nested</>
                }
              ]
            }
          ]
        }
      ]
    },
    {
      exact     : true,
      name      : 'not-found',
      path      : '*',
      label     : 'Not Found',
      component : () => <>Not Found</>
    }
  ]);

  return (
    <BrowserRouter>
      <MappingProvider {...routes}> // pass all routes into the context
        <Switch>
            {
                Object.values(routes).map((route) => route)
            }
        </Switch>
      </MappingProvider>
    </BrowserRouter>
  );
};
```

# Components

## **`MappingProvider`** (Required)

Responsible for the functional context of the library, without it, any and all functionality will be invalid.

# Hooks

## **`useMap()`** (Required)

Is the main hook for the proper functioning of the library. It takes only a single argument in its use, an `array` of `objects`, where any and all properties are the same as the `Route` component of the [React Router](https://reactrouter.com/web/guides/quick-start). However, there are 3 new properties to be included that are necessary for the use of the other hooks that will be described later. Its return is an object with each of the routes informed in its argument, each property returned is equivalent to each of the routes informed and all already treated with the `Route` component.

### Double route

It is possible to reuse the same route component, with something I call a "double route". Using the `useMap` hook, just use an array in both `name` and `path`, both need to contain the same number of indices to equalize the routes. Check out the example:

```jsx
import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { MappingProvider, useMap } from 'react-router-mapping';

export default () => {

  const routes = useMap([
    {
      exact     : true,
      name      : [
        'route-one',
        'route-1'
      ],
      path      : [
        '/route-one',
        '/route-1'
      ],
      label     : 'Route 1',
      component : lazy(() => import(/* webpackChunkName: 'route-one' */'./Route1'))
    }
  ]);

  return (
    ...
  );
};
```

It is not recommended to use the "double route" with nesting, it can cause some confusion, because it will always use the last index value of the top route.

### Properties

| Property | Type | Description | Default |
| ------ | ------ | ------ | ------ |
| name | **String|Array** | Key value for route identification | **Required** | 
| label | **String** | Friendly title for breadcrumb use | **Empty** |
| as | **Element** | This attribute is unique to work in conjunction with the `AuthRoute` component of the [React Router Authenticator](https://www.npmjs.com/package/react-router-authenticator) library | **Empty** |

## **`useRoute()`**

Is the hook responsible for allowing you to access the routes object generated by the library. Below I describe their methods:

## **`all()`**

This method returns a list with all the routes that the application has, for example:

```jsx
import { useEffect } from 'react';
import { useRoute } from 'react-router-mapping';

export default () => {

  const { all } = useRoute();
	
  useEffect(() => {
    console.log(all());
  }, []);
  ...
}
```

### Return

```json
{
  "route-one": {
    "name": "route-one",
    "path": "/route-one",
    "label": "Route 1"
  },
  "route-two": {
    "name": "route-two",
    "path": "/route-two",
    "label": "Route 2"
  },
  "route-three": {
    "name": "route-three",
    "path": "/level-one/route-three",
    "label": "Route 3"
  },
  "route-four": {
    "name": "route-four",
    "path": "/level-one/route-four",
    "label": "Route 4"
  },
  "route-five": {
    "name": "route-five",
    "path": "/level-one/level-two/route-five",
    "label": "Route 5"
  },
  "route-six": {
    "name": "route-six",
    "path": "/level-one/level-two/route-six",
    "label": "Route 6"
  },
  "route-nested": {
    "name": "route-nested",
    "path": "/level-one/level-two/route-six/route-nested/:id",
    "label": "Route Nested"
  },
  "not-found": {
    "name": "not-found",
    "path": "*",
    "label": "Not Found"
  }
}
```

## **`route(name:string, params:object)`**

This method has 2 (two) distinct features, the first would be passing a value to the first `name` argument, see below for a practical example:

```jsx
import { useEffect } from 'react';
import { useRoute } from 'react-router-mapping';

export default () => {

  const { route } = useRoute();

  useEffect(() => {
    console.log(route('route-six'));
  }, []);
  ...
}
```

### Return

```
/level-one/level-two/route-six
```

The second and last feature would be a complement to dynamic parameters in the route, to perform a substitution of values ​​in the routes, just use the second argument `params` as an object and put the property with the name of the desired parameter and its respective value, see the example:

```jsx
import { useEffect } from 'react';
import { useRoute } from 'react-router-mapping';

export default () => {

  const { route } = useRoute();

  useEffect(() => {
    console.log(route('route-nested', { id : 789 }));
  }, []);
  ...
}
```

### Return

```
/level-one/level-two/route-six/route-nested/789
```

## **`useBreadcrumb()`**

As the name says, this is a hook for breadcrump, without much secret, it returns an array of objects containing the full path of the user's location in the application, a practical example, let's say the user is on the 'Nested Route':

```jsx
import { useEffect } from 'react';
import { useBreadcrumb } from 'react-router-mapping';

export default () => {

  const breadcrumb = useBreadcrumb();

  useEffect(() => {
    console.log(breadcrumb);
  }, []);
  ...
}
```

### Return

```json
[
  {
    "name": "route-six",
    "path": "/level-one/level-two/route-six", 
    "label": "Route Six"
  },
  {
    "name": "route-nested",
    "path": "/level-one/level-two/route-six/route-nested", 
    "label": "Route Nested"
  }   
]
```