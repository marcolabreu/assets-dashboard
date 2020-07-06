import React, { Fragment, useState } from "react";
import {
   Collapse,
   createStyles,
   Divider,
   List,
   ListItem,
   ListItemText,
   Theme,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ChevronRight, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      alert: {
         color: "red",
      },
      shareClasses: {
         paddingLeft: theme.spacing(12),
      },
      subFund: {
         paddingLeft: theme.spacing(7),
      },
   })
);

export const SubFundListItem: React.FC<{
   subfund_id: string;
   name: string;
   share_classes: {
      [share_class_id_id: string]: {
         name: string;
         uid: string;
      };
   };
}> = function ({ subfund_id, name, share_classes }) {
   const [open, setOpen] = useState(false);
   const styles = useStyles();

   const handleClick = () => {
      setOpen(!open);
   };

   return (
      <Fragment key={subfund_id}>
         <ListItem
            button
            className={styles.subFund}
            onClick={handleClick}
            aria-label={name}
         >
            {open ? <ExpandMore /> : <ChevronRight />}
            <ListItemText primary={name} />
            <span className={styles.alert}>0</span>
         </ListItem>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
               {Object.entries(share_classes).map(([subfund_id, { name }]) => {
                  return (
                     <>
                        <ListItem
                           button
                           className={styles.shareClasses}
                           key={subfund_id}
                           aria-label={name}
                        >
                           <ListItemText primary={name} />
                           <span className={styles.alert}>0</span>
                        </ListItem>
                        <Divider />
                     </>
                  );
               })}
            </List>
         </Collapse>
         {open ? null : <Divider />}
      </Fragment>
   );
};

export const FundListItem: React.FC<{
   fund_id: string;
   name: string;
   subfunds: {
      [subfund_id: string]: {
         name: string;
         share_classes: {
            [share_class_id_id: string]: {
               name: string;
               uid: string;
            };
         };
      };
   };
}> = function ({ fund_id, name, subfunds }) {
   const [open, setOpen] = useState(false);
   const styles = useStyles();

   const handleClick = () => {
      setOpen(!open);
   };

   return (
      <Fragment key={fund_id}>
         <ListItem button onClick={handleClick} aria-label={name}>
            {open ? <ExpandMore /> : <ChevronRight />}
            <ListItemText primary={name} />
            <span className={styles.alert}>0</span>
         </ListItem>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
               {Object.entries(subfunds).map(
                  ([subfund_id, { name, share_classes }]) => {
                     return (
                        <SubFundListItem
                           key={subfund_id}
                           subfund_id={subfund_id}
                           name={name}
                           share_classes={share_classes}
                        />
                     );
                  }
               )}
            </List>
         </Collapse>
         {open ? null : <Divider />}
      </Fragment>
   );
};
