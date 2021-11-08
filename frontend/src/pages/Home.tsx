import Home from "../components/Home";
import * as api from "../utils/api";


export const getNextFrame = async () => {

const frame = api.getFrame();
  
  return frame;
}

export default function HomePage() {
  return (
    <div>
      ${getNextFrame}
      <Home />
    </div>
  );
}
