import graphql from 'babel-plugin-relay/macro';
import { useMutation, ConnectionHandler, useFragment } from 'react-relay';
import { TodoForm } from './TodoForm';
import { useMessage } from '../../contexts/MessageContext';
import { CreateTodoFormConnectionParent$key } from './__generated__/CreateTodoFormConnectionParent.graphql';

const CreateTodoFormConnectionParent = graphql`
  fragment CreateTodoFormConnectionParent on User {
    id
  }
`;

const CreateTodoFormMutation = graphql`
  mutation CreateTodoFormMutation(
    $name: String!
    $description: String!
    $connections: [ID!]!
  ) {
    addTodo(name: $name, description: $description) {
      todoEdge @appendEdge(connections: $connections) {
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

// TODO type connection id
interface CreateTodoFormProps {
  user: CreateTodoFormConnectionParent$key;
}

export function CreateTodoForm({ user }: CreateTodoFormProps) {
  const data = useFragment(CreateTodoFormConnectionParent, user);
  const [commitMutation, isMutationInFlight] = useMutation(
    CreateTodoFormMutation
  );
  const messageApi = useMessage();
  const connectionID = ConnectionHandler.getConnectionID(
    data.id,
    'TodoListFragment_todos'
  );

  return (
    <TodoForm
      title="Create new TODO"
      onSubmit={(values, reset) => {
        commitMutation({
          variables: {
            ...values,
            connections: [connectionID],
          },
          onCompleted: () => {
            messageApi.success('Todo created successfully');
            reset?.();
          },
        });
      }}
      disabled={isMutationInFlight}
    />
  );
}
