import React from 'react';
import logo from './logo.svg';

import Header from './components/Header';
import Footer from './components/Footer';
import './App.Module.css';
import Creator from './routes/Creator';
function App() {
  return (
    <>
      <Header></Header>
      <div className="App">

        <header className="App-header">

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
        </header>
      </div>
      <Creator/>
      <Footer></Footer>
    </>


  );
}

export default App;
