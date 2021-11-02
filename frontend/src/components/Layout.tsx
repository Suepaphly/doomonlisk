import { Layout } from "antd";

const { Header, Content, Footer } = Layout;


const AppLayout: React.FC = ({ children }) => {

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 2,
          width: "100%",
        }}
      >
      </Header>
      <Content
        className="site-layout"
        style={{
          // padding: "3em",
          marginTop: 32,
          paddingBottom: 32,
          backgroundColor: "white",
          border: "none",
        }}
      >
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Doom_on_Lisk
      </Footer>
      ;
    </Layout>
  );
};

export default AppLayout;
