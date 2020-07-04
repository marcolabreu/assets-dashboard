import React from "react";
import { Container } from "@material-ui/core";

import "./styles/App.css";

import { FundsList } from "./components/FundsList";

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Funds Super Dashboard</h1>
      </header>
      <Container>
        <FundsList />
      </Container>
    </div>
  );
}

export default App;
