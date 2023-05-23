import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Result
      title="Unauthorized"
      status="403" // TODO there is no 401, I'll reuse the 403 icon
      subTitle="You must be authenticated to access this page."
      extra={
        <>
          <Button type="primary" onClick={() => navigate('/')}>
            Login
          </Button>
          <Button type="primary" onClick={() => navigate('/signup')}>
            Signup
          </Button>
        </>
      }
    />
  );
}
