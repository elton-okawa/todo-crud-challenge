import { Col, Row, Space } from 'antd';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { TodoContainerQuery as TodoContainerQueryType } from './__generated__/TodoContainerQuery.graphql';
import React from 'react';

const TodoContainerQuery = graphql`
  query TodoContainerQuery {
    listTodo {
      id
      ...TodoItemFragment
    }
  }
`;

export function TodoContainer() {
  const query = useLazyLoadQuery<TodoContainerQueryType>(
    TodoContainerQuery,
    {}
  );

  return (
    <Row>
      <Col span={12}>
        <TodoForm />
      </Col>
      <Col span={12}>
        <React.Suspense fallback={'loading...'}>
          <Space direction="vertical" style={{ display: 'flex' }}>
            {query.listTodo.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Space>
        </React.Suspense>
      </Col>
    </Row>
  );
}
