import Routes from "./Routes";
import AppLayout from "./components/Layout";
import React, { useState, useEffect } from "react";
import * as api from "./utils/api";
import * as jimp from 'jimp';

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
    const nextFrame = await api.getFrame();    
    var canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 180;
    var ctx = canvas.getContext('2d');  
        
    const imageData = new ImageData(Uint8ClampedArray.from(nextFrame), 320, 200);
    ctx.putImageData(imageData, 0, 0);
  };
  
  
  
  
  return (
      <AppLayout>
         {frame}
        <Routes />
      </AppLayout>
  );
};

export default App;
