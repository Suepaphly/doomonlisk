import Home from "../components/Home";
import * as api from "../utils/api";

const client = await api.getClient();

const frame = client.getFrame();

export default function HomePage() {
  return (
    <div>
      ${frame}
      <Home />
    </div>
  );
}
