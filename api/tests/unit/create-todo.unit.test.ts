jest.mock('data/todo.persistence');

import { plainToInstance } from 'helpers';
import { todoService, CreateTodoParams } from 'services';

const validInput = {
  name: 'Super todo',
  description: 'Super description',
};

const cases = [
  {
    input: { ...validInput, name: 'a' },
    description: '"name" does not have minimum length',
  },
  {
    input: {
      ...validInput,
      name: Array.from({ length: 51 }, (_, i) => i.toString()).join(''),
    },
    description: '"name" is over max length',
  },
  {
    input: {
      ...validInput,
      description: 'a',
    },
    description: '"description" does not have minimum length',
  },
  {
    input: {
      ...validInput,
      description: Array.from({ length: 301 }, (_, i) => i.toString()).join(''),
    },
    description: '"description" is over max length',
  },
];

describe('createTodo - Unit Tests', function () {
  test('should not throw error', async () => {
    const params = plainToInstance(CreateTodoParams, validInput);

    await expect(todoService.createTodo(params)).resolves.not.toThrow();
  });

  test.each(cases)('should throw error if $description', async ({ input }) => {
    const params = plainToInstance(CreateTodoParams, input);

    await expect(todoService.createTodo(params)).rejects.toThrow();
  });
});
