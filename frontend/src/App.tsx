import Routes from "./Routes";
import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./components/Layout";
import * as api from "./utils/api";
import * as jimp from 'jimp';


const frameRefreshRate = 10000;



const App: React.FC = () => {
  
  const canvasRef : HTMLCanvasElement = document.getElementById('myImage');  

  useEffect(() => {
      const intervalId = setInterval(async function () {
      const nextFrame = await api.getFrame();        

      if(canvasRef?.current){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
      }

      const imageData = new ImageData(Uint8ClampedArray.from(nextFrame), 320, 200);
      ctx.putImageData(imageData, 0, 0); 
    }, frameRefreshRate);
     

    return () => {
      clearInterval(intervalId);
    };
  }, []);  
  
  
  
  
  
  return (
      <AppLayout>
         <canvas id="myImage" ref={canvasRef} {...frame}/>
        <Routes />
      </AppLayout>
  );
};

export default App;
