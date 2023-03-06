import logo from './logo.svg';
import './App.css';

import { Button, DatePicker } from '@ui5/webcomponents-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DatePicker></DatePicker>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Button>Hello World!</Button>

      </header>      
    </div>
  );
}

export default App;
