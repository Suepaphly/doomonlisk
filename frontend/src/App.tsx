import Routes from "./Routes";
import AppLayout from "./components/Layout";
import * as api from "./utils/api";


const App: React.FC = () => {
  
  const [frame, setFrame] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(refreshFrame, statsRefreshRate);
    refreshStats();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshFrame = async () => {
    const nextFrame = await fetchnextFrame();    

    setFrame(nextFrame);
  };
  
  
  return (
      <AppLayout>
         {frame}
        <Routes />
      </AppLayout>
  );
};

export default App;
