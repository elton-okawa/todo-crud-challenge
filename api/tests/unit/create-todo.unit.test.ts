jest.mock('data/todo.repository');

import { ObjectId } from 'mongodb';
import { plainToInstance } from 'helpers';
import { todoService, CreateTodoParams } from 'services';
import { UserEntity } from 'data';

const validInput = {
  name: 'Super todo',
  description: 'Super description',
};

const validUser = {
  _id: new ObjectId(),
};

const cases = [
  {
    user: plainToInstance(UserEntity, validUser),
    input: { ...validInput, name: 'a' },
    description: '"name" does not have minimum length',
  },
  {
    user: plainToInstance(UserEntity, validUser),
    input: {
      ...validInput,
      name: Array.from({ length: 51 }, (_, i) => i.toString()).join(''),
    },
    description: '"name" is over max length',
  },
  {
    user: plainToInstance(UserEntity, validUser),
    input: {
      ...validInput,
      description: 'a',
    },
    description: '"description" does not have minimum length',
  },
  {
    user: plainToInstance(UserEntity, validUser),
    input: {
      ...validInput,
      description: Array.from({ length: 301 }, (_, i) => i.toString()).join(''),
    },
    description: '"description" is over max length',
  },
  {
    user: null,
    input: validInput,
    description: 'user is not authenticated',
  },
];

describe('createTodo - Unit Tests', function () {
  test('should not throw error', async () => {
    const params = plainToInstance(CreateTodoParams, validInput);
    const user = plainToInstance(UserEntity, validUser);

    await expect(todoService.createTodo(user, params)).resolves.not.toThrow();
  });

  test.each(cases)(
    'should throw error if $description',
    async ({ input, user }) => {
      const params = plainToInstance(CreateTodoParams, input);

      await expect(todoService.createTodo(user, params)).rejects.toThrow();
    }
  );
});
