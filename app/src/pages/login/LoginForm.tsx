import { Button, Form, Input, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay';
import { useMessage } from '../../contexts/MessageContext';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../../constants';
import {
  LoginFormMutation$data,
  LoginFormMutation as LoginFormMutationType,
} from './__generated__/LoginFormMutation.graphql';

const LoginFormMutation = graphql`
  mutation LoginFormMutation($input: LoginMutationInput!) {
    login(input: $input)
  }
`;

export function LoginForm() {
  const [commit, isInFlight] =
    useMutation<LoginFormMutationType>(LoginFormMutation);
  const navigate = useNavigate();
  const message = useMessage();

  const onCompleted = (response: LoginFormMutation$data) => {
    localStorage.setItem(LocalStorage.TOKEN, response.login);
    message.success('Logged in successfully!');
    navigate('/');
  };

  // TODO handle error better
  const onError = (error: Error) => {
    message.error(error.message);
  };

  const onFinish = (values: any) => {
    commit({
      variables: { input: values },
      onCompleted,
      onError,
    });
  };

  return (
    <>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Login
      </Typography.Title>
      <Form
        name="login"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        disabled={isInFlight}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
