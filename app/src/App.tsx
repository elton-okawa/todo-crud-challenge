import { Layout, message } from 'antd';
import { MessageContext } from './contexts/MessageContext';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from './components';
import graphql from 'babel-plugin-relay/macro';
import { loadQuery, usePreloadedQuery } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';
import { AppQuery as AppQueryType } from './__generated__/AppQuery.graphql';
import { Header } from './components';
const { Content, Footer } = Layout;

const AppQuery = graphql`
  query AppQuery {
    viewer {
      ...AuthGuardFragment
      ...HeaderFragment
    }
  }
`;

const initialQuery = loadQuery<AppQueryType>(RelayEnvironment, AppQuery, {});
const PUBLIC_ROUTES = ['/', '/signup'];

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const data = usePreloadedQuery<AppQueryType>(AppQuery, initialQuery);

  return (
    <>
      {contextHolder}
      <MessageContext.Provider value={messageApi}>
        <AuthGuard
          publicRoutes={PUBLIC_ROUTES}
          userResult={data.viewer}
          renderAllowed={(refresh) => (
            <Layout style={{ height: '100vh', display: 'flex' }}>
              <Header refreshAuth={refresh} viewer={data.viewer} />
              <Content
                className="site-layout"
                style={{
                  marginTop: '10px',
                  padding: '0 50px',
                  height: '100%',
                  flexGrow: 1,
                }}
              >
                <Outlet context={{ refresh }} />
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                TODO Manager ©2023
              </Footer>
            </Layout>
          )}
        />
      </MessageContext.Provider>
    </>
  );
}

export default App;
