import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export function CreateAccountCard() {
  const navigate = useNavigate();

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography.Text style={{ textAlign: 'center' }}>
        New to TODO Manager?{' '}
      </Typography.Text>

      <Button type="link" onClick={() => navigate('/signup')}>
        Create an account
      </Button>
    </Card>
  );
}
