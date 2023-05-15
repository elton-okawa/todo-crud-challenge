import graphql from 'babel-plugin-relay/macro';
import { TodoItemFragment$key } from './__generated__/TodoItemFragment.graphql';
import { useFragment } from 'react-relay';
import { Card, Checkbox, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const TodoItemFragment = graphql`
  fragment TodoItemFragment on Todo {
    id
    name
    completed
  }
`;

interface TodoItemProps {
  todo: TodoItemFragment$key;
}

export function TodoItem({ todo }: TodoItemProps) {
  const data = useFragment(TodoItemFragment, todo);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <Checkbox checked={data.completed} onChange={onChange} />
        <Typography.Text>{data.name}</Typography.Text>
      </div>
    </Card>
  );
}
