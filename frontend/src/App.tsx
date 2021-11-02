import { useState } from "react";
import Routes from "./Routes";
import AppLayout from "./components/Layout";

const App: React.FC = () => {
  const [userInfo] = useState();

  return (
    <UserContext.Provider value={{ userInfo }}>
      <AppLayout>
        <Routes />
      </AppLayout>
  );
};

export default App;
