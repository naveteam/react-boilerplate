# Nave Boilerplate

Boilerplate baseado no [Create React App](https://github.com/facebook/create-react-app)

## Code Standard

Além de todos os pontos citadas no [nave guide](https://nave.gitlab.io/guides/nave/code-guide/), como padrão de imports e boas práticas de javascript, existem algumas boas práticas que devem ser usadas, principalmente na criação de componentes e páginas.

1. Evite usar `styleds` desnecessários. Temos componentes de Row, Column e Text para evitar o uso desnecessários de styleds nas páginas. Além disso, estes componentes possuem o [styled-system](https://styled-system.com/getting-started), que permite passar margins, paddings e afins por props;
2. Ao criar um novo componente, sempre cogite a utilização do `styled-system`;
3. Sempre adicione as [prop-types](https://github.com/facebook/prop-types) nos componentes. Além de ajudar outras pessoas que forem usar este componente, serve também como documentação;
4. **NUNCA** repita o mesmo código duas vezes. Não copie e cole. Crie helpers e components. Reutilize código;
5. Se precisar criar um componente com várias variações, dê uma olha no componente de `Text` e utilize a propriedade `variant` do `styled-system`;
6. Siga o padrão de pastas e padrão de código. Participe da construção do boilerplate, dê feedbacks e contribua com melhorias.

## Estrutura de Pastas

```
├── /public
├── /src
|   ├── /components
|   |    ├── /<component_name_folder>
|   |    |    ├── <component_name_file>.js
|   |    |    ├── index.js
|   ├── /helpers
|   |    ├── <helper_file>.js
|   |    ├── index.js
|   ├── /providers
|   ├── /services
|   ├── /routes
|   |    ├── /<route_name_folder>
|   |    |    ├── <route_name_file>.js
|   |    |    ├── index.js
|   ├── /theme
|   ├── /context (optional)
|   ├── /redux (optional)
```

## Start

Clonar esse repositório e executar o comando `yarn` para instalar as dependências.

## Rodar projeto

`yarn start`

## Commit

`yarn commit`

## Sentry

O Sentry somente estará ativo se `REACT_APP_NODE_ENV=production`.

Para configurar o Sentry corretamente, siga as instruções abaixo:

1. Crie um projeto no [Sentry](https://sentry.io/welcome) e coloque o dns que ele disponibiliza na env `REACT_APP_SENTRY_URL`;
2. No arquivo helpers/bootstrap, adicionar as informações de usuário que você julgar importante.

## Babel plugins

- babel-transform-remove-console
- @babel/plugin-proposal-optional-chaining
