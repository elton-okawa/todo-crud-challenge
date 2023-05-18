## Backend

- Split resolvers handlers
- Validate create input (e.g. `name` with minimum size)
- Better validation error message
- Paginate todo

## Frontend

- Handle errors

## Missing Features

### Frontend Testing

[React relay](https://relay.dev/docs/guides/testing-relay-components/) has a guide about how to test, basically you can provide an mocked relay environment which allows you to send mocked query and mutation responses

### Authentication

Backend

- Add `mutation signUp(login: String!, password: String!)` -> creates an `User`
  - validates input format
  - validates if user already exists
  - hash + salt password
- Add `mutation signIn(login: String!, password: String!)` -> authenticate an `User`
  - read user on db
  - hash provided password and compare with hash + salted
  - returns an JWT token
- On GraphQL handler
  - reads `Authentication` header with JWT token
  - add to `context` user object
- On `query me`
  - validates if `context.user` is defined (user is logged in)
  - use this value to query on database `todo` with provided `user.id`

Frontend

- Add `signUp` page
  - calls `signUp` mutation
- Add `signIn` page
  - calls `signIn` mutation
  - store token on `localStorage`
- On `Relayenvironment.ts` on `fetchFn` read token from `localStorage`
- Redirect user to `signIn` page if `localStorage` does not have token or auth error (not sure how?)

### Storybook (not sure how)

It might be similar to testing, we create a mocked relay environment
