import { useState } from "react";
import { Layout } from "antd";
import { useHistory } from "react-router";

const { Header, Content, Footer } = Layout;


const AppLayout: React.FC = ({ children }) => {
  const history = useHistory();

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
