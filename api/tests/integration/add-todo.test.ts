import * as commons from '../commons';

const mutation = `
  mutation CreateTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      todoEdge {
        node {
          id
          name
          description
          completed
        }
      }
    }
  }
`;

describe('AddTodo Mutation', () => {
  beforeAll(async () => {
    await commons.startTestServer();
  });

  afterAll(async () => {
    await commons.stopDevServer();
  });

  it('should create todo correctly', async () => {
    const variables = {
      name: 'test',
      description: 'test description',
    };
    const { data, hasErrors } = await commons.graphqlRequest({
      query: mutation,
      variables: variables,
    });

    expect(hasErrors).toBe(false);
    expect(data.addTodo).toStrictEqual({
      todoEdge: {
        node: {
          ...variables,
          id: expect.any(String),
          completed: false,
        },
      },
    });
  });
});
