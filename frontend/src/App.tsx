import Routes from "./Routes";
import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./components/Layout";
import { getClient } from "./utils/api";
import * as jimp from 'jimp';

const frameRefreshRate = 10000;

const App: React.FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(null);
  const clientRef = useRef<any>(null);


  useEffect (()  => {    

    const setupSocket = async () => { 
      clientRef.current = await getClient();      
    }
    
    setupSocket();
    
    setInterval(async()=>{ 
      if(clientRef.current){
        let frameData = await clientRef.current.invoke("doomonlisk:getFrame");
        drawFrame(frameData);
      }    
    }, 100);

  }, []);



  const drawFrame = async (frameData : any) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context && frameData) {
        
         const imageData = new ImageData(Uint8ClampedArray.from(Object.values(frameData)), 320, 200);

        context.clearRect(0, 0, 320, 200);
        context.putImageData(imageData, 0, 0); 
      }
  }
};

  /*
  const [frame, setFrame] = useState(new Uint8Array(256000));

  useEffect (()  => {    

    const intervalId = setInterval(refreshFrame, frameRefreshRate);

    window.requestAnimationFrame(drawFrame);

    return () => {
      clearInterval(intervalId);
    };
  }, [frame]);

  const refreshFrame = async () => {
    const nextFrame = await api.getFrame()
    setFrame(nextFrame);
  }  

  const drawFrame = async () => {
    if (canvasRef.current) {
      refreshFrame();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context && frame) {
        
        var imageData = new ImageData(Uint8ClampedArray.from(Object.values(frame)), 320, 200);

        context.clearRect(0, 0, 320, 200);
        context.putImageData(imageData, 0, 0); 
        window.requestAnimationFrame(drawFrame);
      }
  }
  }
  */
  
  return (
         <canvas id="myImage" ref={canvasRef} />
  )
}

export default App;
