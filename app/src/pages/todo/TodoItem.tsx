import graphql from 'babel-plugin-relay/macro';
import { TodoItemFragment$key } from './__generated__/TodoItemFragment.graphql';
import { useFragment, useMutation } from 'react-relay';
import { Button, Card, Checkbox, Row, Space, Tooltip, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
}

export function TodoItem({ todo, onSelect }: TodoItemProps) {
  const data = useFragment(TodoItemFragment, todo);
  const [commit, isInFlight] = useMutation(TodoItemDeleteMutation);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onDelete = () => {
    commit({ variables: { id: data.id } });
  };

  return (
    <Card size="small">
      <Row justify="space-between" align="middle">
        <Space>
          <Checkbox checked={data.completed} onChange={onChange} />
          <Typography.Text>{data.name}</Typography.Text>
        </Space>
        <Space>
          <Tooltip title="Edit">
            <Button shape="circle" icon={<EditOutlined />} onClick={onSelect} />
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
