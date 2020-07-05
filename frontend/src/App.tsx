import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import "./styles/App.css";
import { FundsList } from "./components/FundsList";
import { Totals } from "./components/Totals";

const styles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "column",
   },
});

function App(): JSX.Element {
   const classes = styles();
   return (
      <div className="App">
         <header className="App-header">
            <h1>Funds Super Dashboard</h1>
         </header>
         <Container className={classes.container}>
            <Totals />
            <FundsList />
         </Container>
      </div>
   );
}

export default App;
