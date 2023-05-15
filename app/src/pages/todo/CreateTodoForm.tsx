import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay';
import { TodoForm } from './TodoForm';

const CreateTodoFormMutation = graphql`
  mutation CreateTodoFormMutation($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      id
      name
      completed
    }
  }
`;

export function CreateTodoForm() {
  const [commitMutation, isMutationInFlight] = useMutation(
    CreateTodoFormMutation
  );

  return (
    <TodoForm
      title="Create new TODO"
      onSubmit={(values) => commitMutation({ variables: values })}
    />
  );
}
