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
    }, 250);

    const handler = async (event : any) => {
      let frameData = await clientRef.current.invoke("doomonlisk:getEMU");      
    };

    /*
    setInterval(async()=>{ 
      if(clientRef.current){
         let frameData = await clientRef.current.invoke("doomonlisk:getEMU");

        }    
      }, 10000);*/

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
  
  return (
    <div>
         <canvas id="myImage" ref={canvasRef} />
         <input type="text" onKeyPress={(e) => handler(e)} />
    </div>
         
  )
}

export default App;