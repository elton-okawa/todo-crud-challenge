import graphql from 'babel-plugin-relay/macro';
import { TodoItemFragment$key } from './__generated__/TodoItemFragment.graphql';
import { ConnectionHandler, useFragment, useMutation } from 'react-relay';
import {
  Button,
  Card,
  Checkbox,
  Row,
  Space,
  Tooltip,
  Typography,
  theme,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMessage } from '../../contexts/MessageContext';
import { TodoItemConnectionParentFragment$key } from './__generated__/TodoItemConnectionParentFragment.graphql';

const TodoItemConnectionParentFragment = graphql`
  fragment TodoItemConnectionParentFragment on User {
    id
  }
`;

const TodoItemFragment = graphql`
  fragment TodoItemFragment on Todo {
    id
    name
    completed
  }
`;

const TodoItemDeleteMutation = graphql`
  mutation TodoItemDeleteMutation($id: ID!, $connections: [ID!]!) {
    deleteTodo(id: $id) @deleteEdge(connections: $connections)
  }
`;

const TodoItemCompleteMutation = graphql`
  mutation TodoItemCompleteMutation($id: ID!, $completed: Boolean!) {
    editTodo(id: $id, completed: $completed) {
      ...TodoItemFragment
    }
  }
`;

interface TodoItemProps {
  todo: TodoItemFragment$key;
  parent: TodoItemConnectionParentFragment$key;
  onSelect: () => void;
  selected: boolean;
}

export function TodoItem({ todo, parent, onSelect, selected }: TodoItemProps) {
  const parentData = useFragment(TodoItemConnectionParentFragment, parent);
  const data = useFragment(TodoItemFragment, todo);
  const [deleteTodo, isDeleting] = useMutation(TodoItemDeleteMutation);
  const [completeTodo, isCompleting] = useMutation(TodoItemCompleteMutation);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const messageApi = useMessage();
  const connectionId = ConnectionHandler.getConnectionID(
    parentData.id,
    'TodoListFragment_todos'
  );

  const onChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;

    completeTodo({
      variables: { id: data.id, completed: checked },
      optimisticResponse: {
        editTodo: {
          ...data,
          completed: !data.completed,
        },
      },
    });
  };

  const onDelete = () => {
    deleteTodo({
      variables: { id: data.id, connections: [connectionId] },
      onCompleted: () => {
        messageApi.success('Todo deleted successfully');
      },
    });
  };

  return (
    <Card
      size="small"
      style={{ borderColor: selected ? colorPrimary : undefined }}
    >
      <Row justify="space-between" align="middle">
        <Space>
          <Checkbox checked={data.completed} onChange={onChange} />
          <Typography.Text>{data.name}</Typography.Text>
        </Space>
        <Space>
          <Tooltip title="Edit">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={onSelect}
              loading={selected}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={onDelete}
              loading={isDeleting}
            />
          </Tooltip>
        </Space>
      </Row>
    </Card>
  );
}
