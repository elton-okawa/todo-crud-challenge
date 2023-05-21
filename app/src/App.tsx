import { Layout, Menu, Typography, message, theme } from 'antd';
import { MessageContext } from './contexts/MessageContext';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from './components';
import graphql from 'babel-plugin-relay/macro';
import { loadQuery, usePreloadedQuery } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';
import { AppQuery as AppQueryType } from './__generated__/AppQuery.graphql';
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const AppQuery = graphql`
  query AppQuery {
    viewer {
      ...AuthGuardFragment
    }
  }
`;

const initialQuery = loadQuery<AppQueryType>(RelayEnvironment, AppQuery, {});
const PUBLIC_ROUTES = ['/', '/signup'];

function App() {
  const {
    token: { colorTextLightSolid },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const data = usePreloadedQuery<AppQueryType>(AppQuery, initialQuery);

  return (
    <>
      {contextHolder}
      <MessageContext.Provider value={messageApi}>
        <Layout style={{ height: '100vh', display: 'flex' }}>
          <Header
            style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
          >
            <Text
              style={{
                color: colorTextLightSolid,
                fontSize: 20,
                margin: 'auto 0',
              }}
            >
              TODO Manager
            </Text>
          </Header>
          <Content
            className="site-layout"
            style={{
              marginTop: '10px',
              padding: '0 50px',
              height: '100%',
              flexGrow: 1,
            }}
          >
            <AuthGuard
              publicRoutes={PUBLIC_ROUTES}
              userResult={data.viewer}
              renderAllowed={(refresh) => <Outlet context={{ refresh }} />}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>TODO Manager ©2023</Footer>
        </Layout>
      </MessageContext.Provider>
    </>
  );
}

export default App;
