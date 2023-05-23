import graphql from 'babel-plugin-relay/macro';
import { useMutation, usePreloadedQuery } from 'react-relay';
import { EditTodoFormQuery as EditTodoFormQueryType } from './__generated__/EditTodoFormQuery.graphql';
import { TodoForm } from './TodoForm';
import { useMessage } from '../../contexts/MessageContext';

export const EditTodoFormQuery = graphql`
  query EditTodoFormQuery($id: ID!) {
    todo(id: $id) {
      id
      name
      description
    }
  }
`;

const EditTodoFormMutation = graphql`
  mutation EditTodoFormMutation($id: ID!, $name: String, $description: String) {
    editTodo(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

// TODO type query ref
interface EditTodoFormProps {
  queryRef: any;
  onCancel: () => void;
}

export function EditTodoForm({ queryRef, onCancel }: EditTodoFormProps) {
  const data = usePreloadedQuery<EditTodoFormQueryType>(
    EditTodoFormQuery,
    queryRef
  );
  const [commitMutation, isMutationInFlight] =
    useMutation(EditTodoFormMutation);
  const messageApi = useMessage();

  // TODO handle if not found
  if (!data.todo) {
    return null;
  }

  return (
    <TodoForm
      title={`Edit TODO '${data.todo.name}'`}
      initialValues={data.todo}
      onSubmit={(values) =>
        commitMutation({
          variables: { id: data.todo?.id, ...values },
          onCompleted: () => {
            messageApi.success('Todo edited successfully');
            onCancel();
          },
        })
      }
      onCancel={onCancel}
      disabled={isMutationInFlight}
      emphasis
    />
  );
}
