import { Col, Row, theme } from 'antd';
import { SignupForm } from './SignupForm';

export function Signup() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        padding: 24,
        minHeight: 380,
        height: '100%',
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
        <SignupForm />
      </Col>
    </Row>
  );
}
