import Routes from "./Routes";
import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./components/Layout";
import * as api from "./utils/api";
import * as jimp from 'jimp';


const frameRefreshRate = 10000;



const App: React.FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const nextFrame = await api.getFrame();       

  useEffect(() => {
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
          const imageData = new ImageData(Uint8ClampedArray.from(nextFrame), 320, 200);
          ctx.putImageData(imageData, 0, 0); 
        }

    }
  }, []);

  /*
  useEffect(() => {
      const intervalId = setInterval(async function () {
      const nextFrame = await api.getFrame();        

      if(canvasRef?.current){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if(ctx != null){
          const imageData = new ImageData(Uint8ClampedArray.from(nextFrame), 320, 200);
          ctx.putImageData(imageData, 0, 0); 
        }

      }

      
    }, frameRefreshRate);
     
     

    return () => {
      clearInterval(intervalId);
    };
  }, []);   */
  
  
  
  
  
  return (
      <AppLayout>
         <canvas id="myImage" ref={canvasRef} {...frame}/>
        <Routes />
      </AppLayout>
  );
};

export default App;
