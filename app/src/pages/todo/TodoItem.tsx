import graphql from 'babel-plugin-relay/macro';
import { TodoItemFragment$key } from './__generated__/TodoItemFragment.graphql';
import { useFragment, useMutation } from 'react-relay';
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

const TodoItemFragment = graphql`
  fragment TodoItemFragment on Todo {
    id
    name
    completed
  }
`;

const TodoItemDeleteMutation = graphql`
  mutation TodoItemDeleteMutation($id: ID!) {
    deleteTodo(id: $id)
  }
`;

interface TodoItemProps {
  todo: TodoItemFragment$key;
  onSelect: () => void;
  selected: boolean;
}

export function TodoItem({ todo, onSelect, selected }: TodoItemProps) {
  const data = useFragment(TodoItemFragment, todo);
  const [commit, isInFlight] = useMutation(TodoItemDeleteMutation);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const messageApi = useMessage();

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onDelete = () => {
    commit({
      variables: { id: data.id },
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
              loading={isInFlight}
            />
          </Tooltip>
        </Space>
      </Row>
    </Card>
  );
}
