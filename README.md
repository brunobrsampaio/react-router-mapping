# React Router Mapping

Esta biblioteca tem como finalidade auxiliar os desenvolvedores a terem uma melhor forma de mapear, agrupar e gerenciar as rotas de suas aplicações.

# Antes de começar

Esta biblioteca trabalha em conjunto com a [React Router](https://reactrouter.com/web/guides/quick-start), utilizando certas funcionalidades que não teriam necessidade de serem reescritas. Sendo assim leiam, com atenção cada seção desse documento.

Existe um componente em específico da biblioteca [React Router](https://reactrouter.com/web/guides/quick-start) que é aconselhável não utilizar, esse seria `Switch`. Este componente realiza a renderização do primeiro componente `Route` encontrado como filho, sendo assim, todo armazenamento das rotas restantes podem ser afetadas e consequentemente não armazenadas para listagens futuras.

# Instalação

```sh
npm install react-router-mapping
```

# Modo de uso

```jsx
import { BrowserRouter, Switch } from "react-router-dom";
import { Mapping, Grouping, MapRoute } from 'react-router-mapping';

export default () => {
		
  return (
    <BrowserRouter>
      <Mapping notFoundRedirect="/404">
        <MapRoute exact name="home" label="Home"  path="/" component={Home} />
        <MapRoute exact name="route-one" label="Route One" path="/route-one" component={Component1} />
        <MapRoute exact name="route-two" label="Route Two" path="/route-two" component={Component2} />
        <MapRoute exact name="route-three" label="Route Three" path="/route-three" component={Component3} />
        <Grouping prefix="level-one">
          <MapRoute exact name="route-four" label="Route Four" path="/route-four" render={() => {
							
            return <Component4 />
          }} />
          <MapRoute exact name="route-five" label="Route Five" path="/route-five" render={() => {
							
            return <Component5 />
          }} />
          <MapRoute exact name="route-six" label="Route Six" path="/route-six" render={() => {
							
            return <Component6 />
          }} />
          <Grouping prefix="level-two">
            <MapRoute exact name="route-seven" label="Route Seven" path="/route-seven">
              <Component7 />
            </MapRoute>
            <MapRoute exact name="route-eight" label="Route Eight" path="/route-eight">
              <Component8 />
            </MapRoute>
            <MapRoute exact name="route-nine" label="Route Nine" path="/route-nine">
              <Component9 />
            </MapRoute>
          </Grouping>
        </Grouping>
		<MapRoute exact name="not-found" label="Not Found" path="/404" component={Component3} />
      </Mapping>
    </BrowserRouter>
  );
};
```

# Componentes

## **`Mapping`** (Obrigátorio)

Responsável pelo contexto funcional da biblioteca, sem ele, toda e qualquer outra funcionalidade será inválida.

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| notFoundRedirect | **String** | Valor da rota responsável por renderizar a página 404 na aplicação | **Vázio** | 

## **`Grouping`**

O `Grouping` realiza o aninhamento das rotas em seu contexto. Ele recebe uma única propriedade, `prefix` sendo um valor `string` de um prefixo para todas as rotas em seu contexto. Isso auxilia o desenvolvedor a não ter redundâcia em novas rotas. O componente também permite a utilização do mesmo como próprio filho em seu contexto, assim sendo possível realizar vários aninhamentos para rotas e rotas filhas, exemplo:

```jsx
<Grouping prefix="level-one">
  <MapRoute path="/route-four" component={Component4} />
  <Grouping prefix="level-two">
    <MapRoute path="/route-seven" component={Component7} />
  </Grouping>
</Grouping>
```

## **`MapRoute`** (Obrigátorio)

O `MapRoute` é um componente espelho de `Route`, um componente que faz parte da biblioteca [React Router](https://reactrouter.com/web/guides/quick-start). O que fazemos é apenas um incremento de 2 (duas) propriedades. Sendo elas `name` e `label`, exemplo:

```jsx
<MapRoute name="home" label="Home" path="/" component={Home} />
```

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| name | **String** | Valor chave para identificação da rota | **Vázio** | 
| label | **String** | Título amigável para uso do breadcrumb | **Vázio** |
| as | **Element** | Este atributo é exclusivo para trabalhar em conjunto com o componente `AuthRoute` da biblioteca [React Router Authenticator](https://www.npmjs.com/package/react-router-authenticator) | **Vázio** |

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

Caso utilize somente o atributo `name` em suas rotas, o retorno do método será idêntico ao demonstrado abaixo:

### Retorno

```json
{
  "home": "/",
  "route-eight": "/level-one/level-two/route-eight",
  "route-five": "/level-one/route-five",
  "route-four": "/level-one/route-four",
  "route-nine": "/level-one/level-two/route-nine",
  "route-one": "/route-one",
  "route-seven": "/level-one/level-two/route-seven",
  "route-six": "/level-one/route-six",
  "route-three": "/route-three",
  "route-two": "/route-two"
}
```

Agora, caso seja utilizado a propriedade `label` em conjunto, teremos um retorno um pouco diferente:

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
    "url": "/", 
    "label": "Home"
  },
  {
    "url": "/level-one/level-two/route-nine", 
    "label": "Rota 9"
  }   
]
```