import Home from "../components/Home";
import * as api from "../utils/api";


export const getNextFrame () => {
  
const client = await api.getClient();

const frame = client.getFrame();
  
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
