import { Layout, Menu, Typography, message, theme } from 'antd';
import { TodoContainer } from './pages';
import { MessageContext } from './contexts/MessageContext';
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  const {
    token: { colorTextLightSolid },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

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
            <TodoContainer />
          </Content>
          <Footer style={{ textAlign: 'center' }}>TODO Manager ©2023</Footer>
        </Layout>
      </MessageContext.Provider>
    </>
  );
}

export default App;
