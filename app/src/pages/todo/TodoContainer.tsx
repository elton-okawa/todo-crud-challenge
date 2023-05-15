import { Col, Row, Space } from 'antd';
import { TodoItem } from './TodoItem';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { TodoContainerQuery as TodoContainerQueryType } from './__generated__/TodoContainerQuery.graphql';
import React, { useState } from 'react';
import type { EditTodoFormQuery as EditTodoFormQueryType } from './__generated__/EditTodoFormQuery.graphql';
import { EditTodoFormQuery, EditTodoForm } from './EditTodoForm';
import { CreateTodoForm } from './CreateTodoForm';

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

  const [editFormQueryRef, loadEditFormQuery] =
    useQueryLoader<EditTodoFormQueryType>(EditTodoFormQuery);

  const [selected, setSelected] = useState<string>('');
  const createSelectedHandler = (id: string) => () => {
    loadEditFormQuery({ id });
    setSelected(id);
  };

  return (
    <Row justify="space-evenly">
      <Col span={10}>
        {selected ? (
          <EditTodoForm
            queryRef={editFormQueryRef}
            onCancel={() => setSelected('')}
          />
        ) : (
          <CreateTodoForm />
        )}
      </Col>
      <Col span={10}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {query.listTodo.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onSelect={createSelectedHandler(todo.id)}
            />
          ))}
        </Space>
      </Col>
    </Row>
  );
}
