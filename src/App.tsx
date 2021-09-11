import React from 'react';
import './App.css';
import ChecksList from './components/ChecksList';
import { ChecksSearch } from './components/ChecksSearch';
import { Notification } from './components/Notification';
import { SearchStore } from './contexts/SearchContext';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="container">
        <SearchStore>
          <Notification />
          <ChecksSearch />
          <ChecksList />
        </SearchStore>
      </div>
    </div>
  );
}

export default App;
