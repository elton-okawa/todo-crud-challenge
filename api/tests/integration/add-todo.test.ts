import * as commons from '../commons';
import { Server } from '../../src/server';
import { TodoEntity } from 'data';
import * as mongoDB from 'mongodb';

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
  let server: Server;
  let todoCollection: mongoDB.Collection<TodoEntity>;
  let token: string;
  let userId: string;

  beforeAll(async () => {
    server = new Server(commons.getTestServerParams());
    await server.start();
    todoCollection = server.database.collections.todo;
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await server.clearDb();
    userId = await commons.saveUser();
    token = await commons.getValidToken(userId);
  });

  it('should create todo correctly', async () => {
    const variables = {
      name: 'test',
      description: 'test description',
    };
    const { data, hasErrors } = await commons.graphqlRequest({
      query: mutation,
      variables: variables,
      token,
    });

    const expectedTodo = {
      ...variables,
      completed: false,
    };

    expect(hasErrors).toBe(false);
    expect(data.addTodo).toStrictEqual({
      todoEdge: {
        node: {
          ...expectedTodo,
          id: expect.any(String),
        },
      },
    });

    const objectId = new mongoDB.ObjectId(data.addTodo.todoEdge.node.id);
    const saved = await todoCollection.findOne({
      _id: objectId,
    });

    expect(saved).not.toBeNull();
    expect(saved).toStrictEqual({ ...expectedTodo, userId, _id: objectId });
  });

  it('should return error if user is not authenticated', async () => {
    const variables = {
      name: 'test',
      description: 'test description',
    };
    const { hasErrors } = await commons.graphqlRequest({
      query: mutation,
      variables: variables,
    });

    expect(hasErrors).toBe(true);
  });
});
