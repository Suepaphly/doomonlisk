import logo from './logo.svg';
import './App.css';

const { apiClient } = require('lisk-sdk');
let clientCache;

const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createIPCClient('~/.lisk/doomonlisk');
    }
    return clientCache;
};

const apiRequest = async () => {
  const client = await getClient();

  /*
  const blockAtHeight123 = await client.block.getByHeight(123);
  client.subscribe('app:block:new', ( data ) => {
    console.log("new block:",data);
  });
  return blockAtHeight123;
  */
};

apiRequest().then((val) => {
  console.log("val:",val);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
