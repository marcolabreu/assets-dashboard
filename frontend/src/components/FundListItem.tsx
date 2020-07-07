import React, { Fragment, useState } from "react";
import {
   Collapse,
   createStyles,
   Divider,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Theme,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ChevronLeft, Done, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      alert: {
         color: theme.palette.error.main,
         fontSize: "large",
         fontWeight: "bold",
         paddingRight: theme.spacing(2),
      },
      allGood: {
         color: "#00b49fee",
         fontSize: "large",
         paddingRight: theme.spacing(2),
      },
      shareClasses: {
         paddingLeft: theme.spacing(8),
      },
      subFund: {
         paddingLeft: theme.spacing(4),
      },
   })
);

const AlertAndReportStatus: React.FC<{
   alerts: number | undefined;
   report_status: boolean | undefined;
}> = function ({ alerts, report_status }) {
   const styles = useStyles();

   return (
      <>
         {report_status && (
            <ListItemIcon className={styles.allGood}>
               <Done color="inherit" />
            </ListItemIcon>
         )}

         <span className={alerts === 0 ? styles.allGood : styles.alert}>
            {alerts}
         </span>
      </>
   );
};

// TODO: refactor these two components: recursive maybe?
const SubFundListItem: React.FC<{
   alerts: number | undefined;
   name: string;
   report_status: boolean | undefined;

   share_classes: {
      [share_class_id_id: string]: {
         alerts: number | undefined;
         name: string;
         report_status: boolean | undefined;
         uid: string;
      };
   };
}> = function ({ alerts, name, report_status, share_classes }) {
   const [open, setOpen] = useState(false);
   const styles = useStyles();

   const handleClick = () => {
      setOpen(!open);
   };

   return (
      <>
         <ListItem
            button
            className={styles.subFund}
            onClick={handleClick}
            aria-label={name}
         >
            <ListItemText primary={name} />

            <AlertAndReportStatus
               alerts={alerts}
               report_status={report_status}
            />

            {open ? <ExpandMore /> : <ChevronLeft />}
         </ListItem>

         <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
               {Object.entries(share_classes).map(
                  ([share_class_id_id, { alerts, name, report_status }]) => {
                     return (
                        <Fragment key={share_class_id_id}>
                           <ListItem
                              button
                              className={styles.shareClasses}
                              aria-label={name}
                           >
                              <ListItemText primary={name} />

                              <AlertAndReportStatus
                                 alerts={alerts}
                                 report_status={report_status}
                              />
                           </ListItem>

                           <Divider />
                        </Fragment>
                     );
                  }
               )}
            </List>
         </Collapse>
         {open ? null : <Divider />}
      </>
   );
};

export const FundListItem: React.FC<{
   alerts: number | undefined;
   name: string;
   report_status: boolean | undefined;

   subfunds: {
      [subfund_id: string]: {
         alerts: number | undefined;
         name: string;
         report_status: boolean | undefined;

         share_classes: {
            [share_class_id_id: string]: {
               alerts: number | undefined;
               name: string;
               report_status: boolean | undefined;
               uid: string;
            };
         };
      };
   };
}> = function ({ alerts, name, report_status, subfunds }) {
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(!open);
   };

   return (
      <>
         <ListItem button onClick={handleClick} aria-label={name}>
            <ListItemText primary={name} />

            <AlertAndReportStatus
               alerts={alerts}
               report_status={report_status}
            />

            {open ? <ExpandMore /> : <ChevronLeft />}
         </ListItem>

         <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
               {Object.entries(subfunds).map(
                  ([
                     subfund_id,
                     { alerts, name, report_status, share_classes },
                  ]) => {
                     return (
                        <SubFundListItem
                           alerts={alerts}
                           key={subfund_id}
                           name={name}
                           report_status={report_status}
                           share_classes={share_classes}
                        />
                     );
                  }
               )}
            </List>
         </Collapse>

         {open ? null : <Divider />}
      </>
   );
};
