import { Col, Row, theme } from 'antd';
import { LoginForm } from './LoginForm';
import { CreateAccountCard } from './CreateAccountCard';

export function Login() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          marginTop: 30,
          padding: 24,
          minHeight: 380,
        }}
      >
        <Col
          span={8}
          style={{
            background: colorBgContainer,
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <LoginForm />
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={10}>
          <CreateAccountCard />
        </Col>
      </Row>
    </>
  );
}
