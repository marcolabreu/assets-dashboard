import React from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      justifyItems: "center",
      minHeight: "8rem",
   },
});

export const Loading: React.FC = function () {
   const styles = useStyles();
   return (
      <Container className={styles.container}>
         <CircularProgress />
      </Container>
   );
};
