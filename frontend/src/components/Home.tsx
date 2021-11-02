import { Row, Col, Typography, Divider, Button, Space, Card } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as api from "../utils/api";

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
