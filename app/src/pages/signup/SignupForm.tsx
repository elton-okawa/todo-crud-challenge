import { Button, Form, Input, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay';
import { useMessage } from '../../contexts/MessageContext';
import { useNavigate } from 'react-router-dom';

const SignupFormMutation = graphql`
  mutation SignupFormMutation($input: SignupMutationInput!) {
    signup(input: $input) {
      id
    }
  }
`;

export function SignupForm() {
  const [commit, isInFlight] = useMutation(SignupFormMutation);
  const navigate = useNavigate();
  const message = useMessage();

  const onCompleted = () => {
    message.success('User created successfully!');
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
        Create an account
      </Typography.Title>
      <Form
        name="signup"
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
            {
              pattern: /[0-9,a-z,A-Z]{3,30}/,
              message: 'must be alphanumeric with 3-30 characters',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }, { min: 3 }]}
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
