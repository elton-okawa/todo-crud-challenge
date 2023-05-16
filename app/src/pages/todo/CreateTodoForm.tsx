import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay';
import { TodoForm } from './TodoForm';
import { message } from 'antd';
import { PayloadError } from 'relay-runtime';
import { useMessage } from '../../contexts/MessageContext';

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
  const messageApi = useMessage();

  return (
    <TodoForm
      title="Create new TODO"
      onSubmit={(values, reset) =>
        commitMutation({
          variables: values,
          onCompleted: () => {
            messageApi.success('Todo created successfully');
            reset?.();
          },
        })
      }
      disabled={isMutationInFlight}
    />
  );
}
