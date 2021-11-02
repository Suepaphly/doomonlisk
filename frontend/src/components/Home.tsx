import { Typography } from "antd";
import { useHistory } from "react-router";

const { Title } = Typography;

export default function Home() {
  const history = useHistory();

  const goto = (location: string) => {
    history.push(`/${location}`);
  };

  return (
      <div
        style={{ textAlign: "center", marginTop: "6em", marginBottom: "6em" }}
      >
        <Title style={{ marginBottom: "5px" }}>
          Doom_On_Lisk
        </Title>
        <Title level={4} style={{ marginTop: "0", marginBottom: "2em" }}>
          It's Doom, on Lisk. 
        </Title>
    </div>
  );
}
