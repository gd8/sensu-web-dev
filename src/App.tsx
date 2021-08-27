import React from "react";

// TODO: Implement me!
// import ChecksList from "./ChecksList";
// import NamespaceSelector from "./NamespaceSelector";
import Welcome from "./Welcome";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="App-body">
        <Welcome />

        {/* TODO: Implement me! */}
        {/* <NamespaceSelector /> */}
        {/* <ChecksList /> */}
      </div>
    </div>
  );
}

export default App;
