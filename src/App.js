import { Button, Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;
function App() {
  return (
    <div className="App">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Report 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Report 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Report 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              Report 4
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background whiteText" style={{ padding: 0 }}>Report generator</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ismail</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
