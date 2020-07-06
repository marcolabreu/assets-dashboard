import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Funds } from "./components/Funds";
import { Menu } from "./components/Menu";
import { Totals } from "./components/Totals";

const useStyles = makeStyles({
   contentContainer: {
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
      alignContent: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
   },
});

export const App = function App(): JSX.Element {
   const styles = useStyles();

   return (
      <>
         <CssBaseline />
         <header className={styles.header}>
            <Container className={styles.headerContainer} maxWidth="md">
               <h1>Dashboard</h1>
               <Menu />
            </Container>
         </header>
         <Container className={styles.contentContainer} maxWidth="md">
            <Totals />
            <Funds />
         </Container>
      </>
   );
};
