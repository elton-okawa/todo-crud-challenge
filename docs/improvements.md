## Backend

- Split resolvers handlers
- Validate create input (e.g. `name` with minimum size)
- Better validation error message
- Paginate todo
- Increase test coverage

## Frontend

- Handle errors
- Semantic errors
  - integrate errors on UI (e.g account already exist) instead of generic error message
  - integrate validation errors on UI (e.g. username alphanumeric) instead of a copy of server rules
- Testing
  - user journey
  - complex flows like adding Todo on list after a successful mutation

## Missing Features

### Frontend Testing

[React relay](https://relay.dev/docs/guides/testing-relay-components/) has a guide about how to test, basically you can provide an mocked relay environment which allows you to send mocked query and mutation responses

### Storybook (not sure how)

It might be similar to testing, we create a mocked relay environment
