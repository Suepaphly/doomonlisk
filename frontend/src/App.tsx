import Routes from "./Routes";
import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./components/Layout";
import * as api from "./utils/api";
import * as jimp from 'jimp';

const frameRefreshRate = 10000;

const client = await api.getClient();


const App: React.FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(null);



  useEffect (()  => {    
    setInterval(()=>{ frameRef.current = client.invoke<Uint8Array>("doomonlisk:getFrame") }, 1000 );
    window.requestAnimationFrame(drawFrame);
  }, []);



  const drawFrame = async () => {
    if (canvasRef.current) {
      refreshFrame();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context && frameRef.current) {
        
        var imageData = new ImageData(Uint8ClampedArray.from(Object.values(frameRef.current)), 320, 200);

        context.clearRect(0, 0, 320, 200);
        context.putImageData(imageData, 0, 0); 
        window.requestAnimationFrame(drawFrame);
      }
  }


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
  );
  };
}

export default App;
