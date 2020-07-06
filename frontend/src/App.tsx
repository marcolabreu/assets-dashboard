import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FundsList } from "./components/FundsList";
import { Menu } from "./components/Menu";
import { Totals } from "./components/Totals";

const useStyles = makeStyles({
   contentContainer: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "800px",
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
      maxWidth: "1000px",
   },
});

export const App = function App(): JSX.Element {
   const styles = useStyles();

   return (
      <>
         <header className={styles.header}>
            <Container className={styles.headerContainer}>
               <h1>Dashboard</h1>
               <Menu />
            </Container>
         </header>
         <Container className={styles.contentContainer}>
            <Totals />
            <FundsList />
         </Container>
      </>
   );
};
