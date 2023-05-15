import graphql from 'babel-plugin-relay/macro';
import { TodoItemFragment$key } from './__generated__/TodoItemFragment.graphql';
import { useFragment } from 'react-relay';
import { Button, Card, Checkbox, Space, Tooltip, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { EditOutlined } from '@ant-design/icons';

const TodoItemFragment = graphql`
  fragment TodoItemFragment on Todo {
    id
    name
    completed
  }
`;

interface TodoItemProps {
  todo: TodoItemFragment$key;
  onSelect: () => void;
}

export function TodoItem({ todo, onSelect }: TodoItemProps) {
  const data = useFragment(TodoItemFragment, todo);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space>
          <Checkbox checked={data.completed} onChange={onChange} />
          <Typography.Text>{data.name}</Typography.Text>
        </Space>
        <Tooltip title="Edit TODO">
          <Button shape="circle" icon={<EditOutlined />} onClick={onSelect} />
        </Tooltip>
      </div>
    </Card>
  );
}
