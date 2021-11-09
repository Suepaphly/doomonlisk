import Routes from "./Routes";
import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./components/Layout";
import * as api from "./utils/api";
import * as jimp from 'jimp';


const frameRefreshRate = 10000;



const App: React.FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(new Uint8Array(2));



  useEffect (()  => {    
    if (canvasRef.current) {
        refreshFrame();
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context && frame) {
          const imageData = new ImageData(Uint8ClampedArray.from(frame), 320, 200);
          context.putImageData(imageData, 0, 0); 
        }
    }
  }, [frame]);

  const refreshFrame = async () => {
    const nextFrame = await api.getFrame()
    setFrame(nextFrame);
  }       

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
         <canvas id="myImage" ref={canvasRef} />
  );
};

export default App;
