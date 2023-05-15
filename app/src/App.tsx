import { Layout, Menu, Typography, theme } from 'antd';
import { TodoContainer } from './pages';
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  const {
    token: { colorBgContainer, colorTextLightSolid },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <Text
          style={{ color: colorTextLightSolid, fontSize: 20, margin: 'auto 0' }}
        >
          TODO Manager
        </Text>
      </Header>
      <Content
        className="site-layout"
        style={{ marginTop: '10px', padding: '0 50px' }}
      >
        <div
          style={{ padding: 24, minHeight: 380, background: colorBgContainer }}
        >
          <TodoContainer />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>TODO Manager ©2023</Footer>
    </Layout>
  );
}

export default App;
