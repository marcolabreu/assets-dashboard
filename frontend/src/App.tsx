import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FundsList } from "./components/FundsList";
import { Menu } from "./components/Menu";
import { Totals } from "./components/Totals";

const styles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "column",
   },

   header: {
      backgroundColor: "#282c34",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "calc(1rem + .5vmin)",
      color: "white",
   },

   headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
   },
});

export const App = function App(): JSX.Element {
   const classes = styles();

   return (
      <div>
         <header className={classes.header}>
            <Container className={classes.headerContainer}>
               <h1>Dashboard</h1>
               <Menu />
            </Container>
         </header>
         <Container className={classes.container}>
            <Totals />
            <FundsList />
         </Container>
      </div>
   );
};
