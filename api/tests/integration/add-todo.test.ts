import * as commons from '../commons';
import request from 'supertest';

const mutation = `
  mutation addTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      todoEdge {
        node: {
          id
          name
          description
          completed
        }
      }
    }
  }
`;

const hello = {
  query: `
  query hello {
    hello
  }
`,
};

describe('AddTodo Mutation', () => {
  beforeAll(async () => {
    await commons.startTestServer();
  });

  afterAll(async () => {
    await commons.stopDevServer();
  });

  it('should create todo correctly', async () => {
    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send(hello);

    console.log(response.body);
  });
});
