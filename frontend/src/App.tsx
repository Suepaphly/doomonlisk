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

  
  var canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 180;
  var ctx = canvas.getContext('2d');
  
  
  const refreshFrame = async () => {
    const nextFrame = await api.getFrame();    

     new jimp({ nextFrame: rgba, width, height }, (err, image) => {
        image.write("../backend/src/app/build/screens/screenshot1.png", () => {
           console.log(frameCount); 
        });
           this.nextFrame = image;
        });		
    
    const imageData = new ImageData(nextFrame);
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
