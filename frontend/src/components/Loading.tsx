import React from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      justifyItems: "center",
      minHeight: "8rem",
   },
});

export const Loading: React.FC = function () {
   const classes = styles();
   return (
      <Container className={classes.container}>
         <CircularProgress />
      </Container>
   );
};
