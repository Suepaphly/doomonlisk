import Routes from "./Routes";
import AppLayout from "./components/Layout";
import React, { useState, useEffect } from "react";
import * as api from "./utils/api";

const frameRefreshRate = 10000;

const App: React.FC = () => {
  
  const [frame, setFrame] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(refreshFrame, frameRefreshRate);
    refreshFrame();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshFrame = async () => {
    const nextFrame : string[] = await api.getFrame();    

    setFrame(nextFrame);
  };
  
  
  return (
      <AppLayout>
         {frame}
        <Routes />
      </AppLayout>
  );
};

export default App;
