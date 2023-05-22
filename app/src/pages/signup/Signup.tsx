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
      style={{ marginTop: 30, padding: 24, minHeight: 380 }}
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
