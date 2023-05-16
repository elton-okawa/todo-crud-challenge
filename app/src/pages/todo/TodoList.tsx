import { Space } from 'antd';
import { TodoItem } from './TodoItem';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay';
import { TodoListFragment$key } from './__generated__/TodoListFragment.graphql';

interface TodoListProps {
  createSelectedHandler: (id: string) => () => void;
  selected: string;
  todos: TodoListFragment$key;
}

const TodoListFragment = graphql`
  fragment TodoListFragment on User {
    todos {
      edges {
        node {
          id
          ...TodoItemFragment
        }
      }
    }
  }
`;

export function TodoList({
  createSelectedHandler,
  selected,
  todos,
}: TodoListProps) {
  const data = useFragment(TodoListFragment, todos);

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      {data?.todos?.edges.map(({ node }) => (
        <TodoItem
          key={node.id}
          todo={node}
          onSelect={createSelectedHandler(node.id)}
          selected={node.id === selected}
        />
      ))}
    </Space>
  );
}
