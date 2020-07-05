import React, { MouseEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import { Menu as MaterialMenu, MenuItem, makeStyles } from "@material-ui/core";

const styles = makeStyles({
   div: {
      alignSelf: "center",
   },
   menuButton: {
      color: "white",
   },
});

export const Menu: React.FC = function () {
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const classes = styles();

   const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div className={classes.div}>
         <Button
            className={classes.menuButton}
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleClick}
         >
            Mockup Menu
         </Button>
         <MaterialMenu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>Dark Mode</MenuItem>
            <MenuItem onClick={handleClose}>Legal Stuff</MenuItem>
            <MenuItem onClick={handleClose}>Help</MenuItem>
         </MaterialMenu>
      </div>
   );
};
