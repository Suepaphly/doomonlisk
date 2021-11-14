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
        let frameData = await clientRef.current.invoke("doomonlisk:getCI");
        drawFrame(frameData);
      }    
    }, 250);

  }, []);



  const drawFrame = async (frameData : any) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context && frameData) {
        

        let frameCount = 0;
        let rgb = new Uint8Array(0);
        frameData.events().onFrame((frame : any) => {
            rgb = frame;

            const width = frameData.width();
            const height = frameData.height();

            const rgba = new Uint8Array(width * height * 4);
            for (let next = 0; next < width * height; ++next) {
                rgba[next * 4 + 0] = rgb[next * 3 + 0];
                rgba[next * 4 + 1] = rgb[next * 3 + 1];
                rgba[next * 4 + 2] = rgb[next * 3 + 2];
                rgba[next * 4 + 3] = 255;
            }

            let currentFrame = rgba;



        
         const imageData = new ImageData(Uint8ClampedArray.from(Object.values(currentFrame)), 320, 200);

          context.clearRect(0, 0, 320, 200);
          context.putImageData(imageData, 0, 0); 
        });
      }
    };
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
  )
}

export default App;
