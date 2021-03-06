import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./components/Layout";
import { getClient } from "./utils/api";
import * as jimp from 'jimp';

const frameRefreshRate = 250;

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
    }, frameRefreshRate);


  }, []);

  const downHandler = async (event : any) => {
    if(clientRef.current){
      let key = event.code;
      if(key == "Enter" ||
         key == "KeyW" ||
         key == "KeyS" ||
         key == "KeyA" ||
         key == "KeyD" ||
         key == "KeyF" ||
         key == "KeyJ" ||
         key == "KeyK" ||
         key == "KeyM" ||
         key == "KeyB"){
        let testKey = await clientRef.current.invoke("doomonlisk:p" + key + "Down");
      }
    }       
  };
  const upHandler = async (event : any) => {
    if(clientRef.current){
      let key = event.code;
      if(key == "Enter" ||
         key == "KeyW" ||
         key == "KeyS" ||
         key == "KeyA" ||
         key == "KeyD" ||
         key == "KeyF" ||
         key == "KeyJ" ||
         key == "KeyK" ||
         key == "KeyM" ||
         key == "KeyB"){
      let testKey = await clientRef.current.invoke("doomonlisk:p" + key + "Up");
      }
    }       
  };

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
         <canvas id="myImage" width={320} height={200} ref={canvasRef} onKeyDown={downHandler} onKeyUp={upHandler} tabIndex={1} />
         <br />
         <p>wsad = move<br />
            j = fire
            k = strafe
            m = map
            f = interact (open doors)
            b = Menu (reset game)
          </p>
    </div>
         
  )
}

export default App;
