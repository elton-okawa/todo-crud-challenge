import { Button, Layout, Space, Typography, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../constants';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay';
import { HeaderFragment$key } from './__generated__/HeaderFragment.graphql';

const HeaderFragment = graphql`
  fragment HeaderFragment on Viewer {
    me {
      id
    }
  }
`;

interface HeaderProps {
  refreshAuth: () => void;
  viewer: HeaderFragment$key;
}

export function Header({ refreshAuth, viewer }: HeaderProps) {
  const data = useFragment(HeaderFragment, viewer);
  const {
    token: { colorTextLightSolid },
  } = theme.useToken();
  const navigate = useNavigate();

  const onSignOut = () => {
    localStorage.setItem(LocalStorage.TOKEN, '');
    refreshAuth();
    navigate('/');
  };

  const loggedIn = !!data.me;

  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography.Text
        style={{
          color: colorTextLightSolid,
          fontSize: 20,
          margin: 'auto 0',
        }}
      >
        TODO Manager
      </Typography.Text>
      {loggedIn ? (
        <Button onClick={onSignOut}>Sign out</Button>
      ) : (
        <Space>
          <Button type="primary" onClick={() => navigate('/')}>
            Login
          </Button>
          <Button onClick={() => navigate('/signup')}>Sign up</Button>
        </Space>
      )}
    </Layout.Header>
  );
}
