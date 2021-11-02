import { useContext, useState } from "react";
import { Card, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../context/context";
import { useHistory } from "react-router";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;


const maxWidth = "1200px";

const AppLayout: React.FC = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("home");
  const history = useHistory();

  const handleLogout = () => {
    history.push(`/`);
  };

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
