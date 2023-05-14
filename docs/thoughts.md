# Thoughts

## Which GraphQL server approach should I use?

Points to consider in both GraphQL-first and Code-first approaches

- GraphQL-first has the advantage to be up-to-date with newest GraphQL features while with Code-first usually there might be a delay until the feature is supported
- GraphQL-first needs to be mapped to Typescript typing
- Code-first solutions usually handle a lot of things behind the scenes, it's amazing when it works, but a real pain to debug and understand when it doesn't

References:

- https://medium.com/swlh/graphql-js-vs-typegraphql-vs-graphql-nexus-2a8036deb851
- https://www.youtube.com/watch?v=VnG7ej56lWw

## Why am I using `class-transformer`?

Classes are useful because we can encapsulate logic and use Typescript decorators (e.g. validate fields), but mapping values from Database -> TS can be a bit tricky and repetitive:

```ts
class TodoEntity {
  constructor(public name: string, public description: string, public completed: = false, public id?: string) {}
}

const entity = new TodoEntity(data.name, data.description, data.completed, data.id);
```

- We need to declare every property
- Optional ones must be always the last
  - What if we have two optional properties but we want to provide only the last one?
  - Default values must be provided if we want to provide an optional value

```ts
class TodoEntity {
  id?: string;
  name: string;
  description: string;
  completed = false;

  constructor(params: {
    name: string;
    description: string;
    id?: string;
    completed?: boolean;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.completed = params.completed ?? false;
  }
}

const entity = new TodoEntity(data);
```

- We had to repeat each value:
  - to define entity's properties
  - on constructor in order to provide typing
  - on the assignment
