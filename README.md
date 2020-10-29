# React Router Mapping

Esta biblioteca tem como finalidade auxiliar os desenvolvedores a terem uma melhor forma de mapear, agrupar e gerenciar as rotas de suas aplicações.

# Pré requisitos

> react@^16.13.1

> react-dom@^16.13.1

> react-router-dom@^5.2.0

# Antes de começar

Esta biblioteca trabalha em conjunto com a [React Router](https://reactrouter.com/web/guides/quick-start), utilizando certas funcionalidades que não teriam necessidade de serem reescritas. Sendo assim leiam, com atenção cada seção desse documento.

# Instalação

```sh
npm install react-route-mapping
```

# Modo de uso

```javascript
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Mapping, Grouping } from 'react-router-mapping';

export default () => {
		
  return (
    <BrowserRouter>
      <Switch>
        <Mapping>
          <Route exact name="home" label="Home"  path="/" component={Home} />
          <Route exact name="route-one" label="Route One" path="/route-one" component={Component1} />
          <Route exact name="route-two" label="Route Two" path="/route-two" component={Component2} />
          <Route exact name="route-three" label="Route Three" path="/route-three" component={Component3} />
          <Grouping path="level-one">
            <Route exact name="route-four" label="Route Four" path="/route-four" render={() => {
							
              return <Component4 />
            }} />
            <Route exact name="route-five" label="Route Five" path="/route-five" render={() => {
							
              return <Component5 />
            }} />
            <Route exact name="route-six" label="Route Six" path="/route-six" render={() => {
							
              return <Component6 />
            }} />
            <Grouping path="level-two">
              <Route exact name="route-seven" label="Route Seven" path="/route-seven">
                <Component7 />
              </Route>
              <Route exact name="route-eight" label="Route Eight" path="/route-eight">
                <Component8 />
              </Route>
              <Route exact name="route-nine" label="Route Nine" path="/route-nine">
                <Component9 />
              </Route>
            </Grouping>
          </Grouping>
        </Mapping>
      </Switch>
    </BrowserRouter>
  );
};
```

# Componentes

## **`Mapping`** (Obrigátorio)

Responsável pelo contexto funcional da biblioteca, sem ele, toda e qualquer outra funcionalidade será inválida.

## **`Grouping`**

O `Grouping` realiza o aninhamento das rotas em seu contexto. Ele recebe uma única propriedade, `path` sendo um valor `string` de um prefixo para todas as rotas em seu contexto. Isso auxilia o desenvolvedor a não ter redundâcia em novas rotas. O componente também permite a utilização do mesmo como próprio filho em seu contexto, assim sendo possível realizar vários aninhamentos para rotas e rotas filhas, exemplo:

```html
<Grouping path="level-one">
  <Route path="/route-four" component={Component4} />
  <Grouping path="level-two">
    <Route path="/route-seven" component={Component7} />
  </Grouping>
</Grouping>
```

## **`Route`** (Não pertence a biblioteca)

Este componente não faz parte da biblioteca em si e sim do [React Router](https://reactrouter.com/web/guides/quick-start). O que fazemos é apenas um incremento de 2 (duas) propriedades, para que o componente `Route` trabalhe em conjunto com a biblioteca. Sendo elas `name` e `label`, exemplo:

```html
<Route name="home" label="Home" path="/" component={Home} />
```

### Propriedades

| Propriedade | Tipo | Descrição | Padrão |
| ------ | ------ | ------ | ------ |
| name | **String** | Valor chave para identificação da rota | **Vázio** | 
| label | **String** | Título amigável para uso do breadcrumb | **Vázio** |

# Hooks

## **`useRoute()`**

O `useRoute` é o hook responsável por lhe permitir acessar o objeto de rotas gerado pela biblioteca. Abaixo descrevo seus métodos:

## **`all()`**

Este método retorna uma lista com todas as rotas que a aplicação possui, exemplo:

```javascript
import { useEffect } from 'react';
import { useRoute } from 'react-router-group';

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
  "route-two": "/route-two",
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

```javascript
import { useEffect } from 'react';
import { useRoute } from 'react-router-group';

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

```html
<Grouping path="level-one">
  <Route path="/route-four/:id" component={Component4} />
</Grouping>
```

```javascript
import { useEffect } from 'react';
import { useRoute } from 'react-router-group';

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

```javascript
import { useEffect } from 'react';
import { useBreadcrumb } from 'react-router-group';

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