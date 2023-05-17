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

  beforeAll(async () => {
    server = new Server(commons.testServerParams);
    await server.start();
    todoCollection = server.database.collections.todo;
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    await server.clearDb();
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
    expect(saved).toStrictEqual({ ...expectedTodo, _id: objectId });
  });
});
