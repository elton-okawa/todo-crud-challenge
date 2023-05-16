import { Col, Row, Spin } from 'antd';

interface LoadingIndicatorProps {
  fullscreen?: boolean;
}

export function LoadingIndicator({
  fullscreen = false,
}: LoadingIndicatorProps) {
  return (
    <Row align="middle" style={{ height: fullscreen ? '100vh' : '100%' }}>
      <Col span={24}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Col>
    </Row>
  );
}
