import graphql from 'babel-plugin-relay/macro';
import { useMutation, ConnectionHandler } from 'react-relay';
import { TodoForm } from './TodoForm';
import { useMessage } from '../../contexts/MessageContext';

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
  connectionParentId: string;
}

export function CreateTodoForm({ connectionParentId }: CreateTodoFormProps) {
  const [commitMutation, isMutationInFlight] = useMutation(
    CreateTodoFormMutation
  );
  const messageApi = useMessage();

  return (
    <TodoForm
      title="Create new TODO"
      onSubmit={(values, reset) => {
        const connectionID = ConnectionHandler.getConnectionID(
          connectionParentId,
          'TodoContainerQuery_todos'
        );

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
