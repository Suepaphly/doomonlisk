import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {

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
