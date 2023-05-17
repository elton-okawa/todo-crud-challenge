# TODO CRUD Challenge

## Quick start

### Pre requisites

- [watchman](https://facebook.github.io/watchman/)
  - Relay compiler needs this
- [docker](https://www.docker.com/)
  - We use a docker image to run mongodb locally

### Install dependencies

```
yarn
```

### Start in development mode

Create `.env` file in the root folder:

```
DB_CONN_STRING="mongodb://admin:admin@localhost:27017"
DB_NAME="todo"
```

Start local mongodb using `docker-compose`

```
docker-compose up -d
```

Watch changes on both backend and frontend:

- Server:
  - https://localhost:4000
    - /graphql - GraphQL endpoint
    - /playground - GraphQL Playground
- Frontend:
  - https://localhost:3000

```
yarn start:dev
```

## Check it out

- [Improvements](./docs/improvements.md)
- [Thoughts and Decisions](./docs/thoughts.md)
- [Useful resources](./docs/resources.md)

## Feature checklist

View [source](https://github.com/BemteviSeguros/jobs/blob/main/Challenge.md)

### Backend

- [x] it should be a [GraphQL](https://graphql.org/) Server using [Node.js](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/)
- [x] it should connect to a database ([MongoDB](https://www.mongodb.com/) or [PostgreSQL](https://www.postgresql.org/))
- [x] it should support GraphQL Queries
- [x] it should support GraphQL Mutations

### Frontend

- [x] it should be a [React](https://reactjs.org/) Web App with [Relay](https://relay.dev/)
- [x] it should support GraphQL Queries with Relay
- [x] it should support GraphQL Mutations with Relay

### Bonus & Extras

- [x] open-sourced on your GitHub
- [-] automated tests: [Jest](https://jestjs.io/) + [react-testing-library](https://testing-library.com/)
- [x] good design (bonus if using a design system, like [antd](https://ant.design/))
- [ ] authentication system
- [ ] [Storybook](https://storybook.js.org/)
- [x] [GraphQL Playground](https://github.com/graphql/graphql-playground)
- [ ] deploy (Vercel? Netlify? Heroku? AWS?)
- [x] CI/CD (GitHub Actions, CircleCI etc)
- [x] ask for help and for code review during the development
