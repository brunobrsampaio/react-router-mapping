# React Router Mapping

Esta biblioteca tem como finalidade auxiliar os desenvolvedores a terem uma melhor forma de mapear, agrupar e gerenciar as rotas de suas aplicações.

# Antes de começar

Esta biblioteca trabalha em conjunto com a [React Router](https://reactrouter.com/web/guides/quick-start), utilizando certas funcionalidades que não teriam necessidade de serem reescritas. Sendo assim leiam, com atenção cada seção desse documento.

Existe um componente em específico da biblioteca [React Router](https://reactrouter.com/web/guides/quick-start) que é aconselhável não utilizar, esse seria `Switch`. Este componente já se encontra incorporado a biblioteca.

# Instalação

```sh
npm install react-router-mapping
```

# Modo de uso

```jsx
import { BrowserRouter, Switch } from 'react-router-dom';
import { Mapping, Grouping, MapRoute } from 'react-router-mapping';

/**
 * Layout A
 */
const LayoutA = ({ children }) => (
    <>
        <Header />
        <main>
            <Aside />
            <section>
                { children }
            </section>
        </main>
        <Footer />
    </>
);

/**
 * Layout B
 */
const LayoutB = ({ children }) => (
    <>
        <Header />
        { children }
        <Footer />
    </>
);

/**
 * Rota 404
 */
const NotFoundPage = () => <MapRoute component={() => <>404 - Not Found</>} />;

export default () => {
		
  return (
    <BrowserRouter>
      <Mapping>
        <MapRoute exact name="home" label="Home"  path="/" component={Home} />
        <MapRoute exact name="route-one" label="Route One" path="/route-one" component={Component1} />
        <MapRoute exact name="route-two" label="Route Two" path="/route-two" component={Component2} />
        <MapRoute exact name="route-three" label="Route Three" path="/route-three" component={Component3} />
        <Grouping prefix="/level-one" layout={LayoutA}>
          <MapRoute exact name="route-four" label="Route Four" path="/route-four" render={() => <Component4 />} />
          <MapRoute exact name="route-five" label="Route Five" path="/route-five" render={() => <Component5 />} />
          <MapRoute exact name="route-six" label="Route Six" path="/route-six" render={() => <Component6 />} />
          <Grouping prefix="/level-two" layout={LayoutB}>
            <MapRoute exact name="route-seven" label="Route Seven" path="/route-seven">
              <Component7 />
            </MapRoute>
            <MapRoute exact name="route-eight" label="Route Eight" path="/route-eight">
              <Component8 />
            </MapRoute>
            <MapRoute exact name="route-nine" label="Route Nine" path="/route-nine">
              <Component9 />
            </MapRoute>
            <NotFoundPage />
          </Grouping>
          <NotFoundPage />
        </Grouping>
        <NotFoundPage />
      </Mapping>
    </BrowserRouter>
  );
};
```

# Componentes

## **`Mapping`** (Obrigátorio)

Responsável pelo contexto funcional da biblioteca, sem ele, toda e qualquer outra funcionalidade será inválida.

## **`MapRoute`** (Obrigátorio)

O `MapRoute` é um componente espelho de `Route`, um componente que faz parte da biblioteca [React Router](https://reactrouter.com/web/guides/quick-start). O que fazemos é apenas um incremento de 2 (duas) propriedades. Sendo elas `name` e `label`, exemplo:

```jsx
<MapRoute name="home" label="Home" path="/" component={Home} />
```

## Páginas 04

Como mencionado acima o componente `Switch` da biblioteca [React Router](https://reactrouter.com/web/guides/quick-start) já se encontra incorporado. Para definir uma rota 404 basta criar uma componente `MapRoute` omitindo a propriedade `path`.

```jsx
<MapRoute component={() => <>404 - Not Found</>} />
```

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| name | **String** | Valor chave para identificação da rota | **Obrigtório** | 
| label | **String** | Título amigável para uso do breadcrumb | **Vázio** |
| as | **Element** | Este atributo é exclusivo para trabalhar em conjunto com o componente `AuthRoute` da biblioteca [React Router Authenticator](https://www.npmjs.com/package/react-router-authenticator) | **Vázio** |

## **`Grouping`**

O `Grouping` realiza o aninhamento das rotas em seu contexto. Ele recebe 2 (duas) propriedades, `prefix` e `layout`, a seguir explico sua utilização. 

A primeira propriedade `prefix`, recebe um valor `string` de um prefixo para todas as rotas em seu contexto. Isso auxilia o desenvolvedor a não ter redundâcia em novas rotas. 

```jsx
<Grouping prefix="/level-one">
  <MapRoute path="/route-four" component={Component4} />
  <Grouping prefix="level-two">
    <MapRoute path="/route-seven" component={Component7} />
  </Grouping>
</Grouping>
```

A segunda propriedade `layout`, recebe um componente que pode ser utilizado para incorporar um layout em especial naquele grupo definido. Se você tiver mais de um `Grouping` como filho, os mesmos receberão o layout do `Grouping` pai.


```jsx
<Grouping prefix="/level-one" layout={LayoutA}>
  <MapRoute path="/route-four" component={Component4} />
  <Grouping prefix="/level-two">
    <MapRoute path="/route-seven" component={Component7} />
  </Grouping>
</Grouping>
```

O componente também permite a utilização do mesmo como próprio filho em seu contexto, assim sendo possível realizar vários aninhamentos para rotas e rotas filhas.

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| prefix | **String** | Prefixo para aninhamento das rotas | **Vázio** | 
| layout | **Component** | Componente que define um layout em especial para aquele grupo de rotas | **Vázio** |

# Hooks

## **`useRoute()`**

O `useRoute` é o hook responsável por lhe permitir acessar o objeto de rotas gerado pela biblioteca. Abaixo descrevo seus métodos:

## **`all()`**

Este método retorna uma lista com todas as rotas que a aplicação possui, exemplo:

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

### Retorno

```json
{
  "home": {
    "path": "/",
    "label": "Home"
  },
  "route-eight": {
    "path": "/level-one/level-two/route-eight",
    "label": "Rota 8"
  },
  "route-five": {
    "path": "/level-one/route-five",
    "label": "Rota 5"
  },
  "route-four": {
    "path": "/level-one/route-four",
    "label": "Rota 4"
  },
  "route-nine": {
    "path": "/level-one/level-two/route-nine",
    "label": "Rota 9"
  },
  "route-one": {
    "path": "/route-one",
    "label": "Rota 1"
  },
  "route-seven": {
    "path": "/level-one/level-two/route-seven",
    "label": "Rota 7"
  },
  "route-six": {
    "path": "/level-one/route-six",
    "label": "Rota 6"
  },
  "route-three": {
    "path": "/route-three",
    "label": "Rota 3"
  },
  "route-two": {
    "path": "/route-two",
    "label": "Rota 2"
  }
}
```

## **`route(name:string, params:object)`**

Esse método possui 2 (duas) funcionalidades distintas, a primeira seria passando um valor para o primeiro argumento `name`, veja abaixo um exemplo prático:

```jsx
import { useEffect } from 'react';
import { useRoute } from 'react-router-mapping';

export default () => {

  const { route } = useRoute();

  useEffect(() => {
    console.log(route('route-nine'));
  }, []);
  ...
}
```

### Retorno

```
/level-one/level-two/route-nine
```

A segunda e última funcionalidade, seria um complemento para parâmetros dinâmicos na rota, para realizar uma substituição de valores nas rotas, basta utilizar o segundo argumento `params` como um objeto e colocar a propriedade com o nome do parâmetro desejável e seu respectivo valor, veja o exemplo:

```jsx
<Grouping prefix="level-one">
  <MapRoute path="/route-four/:id" component={Component4} />
</Grouping>
```

```jsx
import { useEffect } from 'react';
import { useRoute } from 'react-router-mapping';

export default () => {

  const { route } = useRoute();

  useEffect(() => {
    console.log(route('route-four', { id : 789 }));
  }, []);
  ...
}
```

### Retorno

```
/level-one/route-four/789
```

## **`useBreadcrumb()`**

Como o prórpio nome diz, esse é um hook para breadcrump, sem muito segredo, o mesmo nos retorna uma propriedade chamada `breadcrumb` com um array de objetos, contendo o caminho completo da localização do usuário na aplicação, um exemplo prático, digamos que o usuário se encontra na Rota 9:

```jsx
import { useEffect } from 'react';
import { useBreadcrumb } from 'react-router-mapping';

export default () => {

  const { breadcrumb } = useBreadcrumb();

  useEffect(() => {
    console.log(breadcrumb);
  }, []);
  ...
}
```

### Retorno

```json
[
  {
    "path": "/", 
    "label": "Home"
  },
  {
    "path": "/level-one/level-two/route-nine", 
    "label": "Rota 9"
  }   
]
```