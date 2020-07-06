import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

import { db, IReportsByDate } from "../services/firebase";
import { localDateFromKey } from "../helpers/localDateFromKey";
import { CompletedPieChart } from "./Charts/CompletedPieChart";

const styles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "row",
      justifyItems: "center",
      width: "30%",
   },
});

export const Totals: React.FC = function () {
   const [alerts, setAlerts] = useState(0);
   const [completed, setCompleted] = useState(0);
   const [date, setDate] = useState("");
   const classes = styles();

   useEffect(() => {
      function observeLastDayReports() {
         const reports_by_date = db.ref("reports_by_date");

         reports_by_date
            .orderByValue()
            .limitToLast(1)
            .on("value", function (dataSnapshot) {
               const data: IReportsByDate = dataSnapshot.val();
               const date = localDateFromKey(Object.keys(data)[0]);
               const reports = Object.values(data)[0];

               const {
                  alertsTotal,
                  completedReports,
                  reportsCount,
               } = Object.entries(reports).reduce<{
                  alertsTotal: number;
                  completedReports: number;
                  reportsCount: number;
               }>(
                  function (acc, entry) {
                     const { nb_alerts, report_status } = entry[1];

                     const alertsTotal = (acc.alertsTotal += nb_alerts);
                     const completedReports =
                        acc.completedReports + Number(report_status);
                     const reportsCount = acc.reportsCount + 1;

                     return {
                        alertsTotal,
                        completedReports,
                        reportsCount,
                     };
                  },
                  {
                     alertsTotal: 0,
                     completedReports: 0,
                     reportsCount: 0,
                  }
               );

               console.log(alertsTotal, completedReports, reportsCount);

               setAlerts(alertsTotal);
               setCompleted(completedReports / reportsCount);
               setDate(date);
            });
      }

      void observeLastDayReports();
   }, []);

   return (
      <div className={classes.container}>
         <div>
            <h2>{date}</h2>
            <p>{alerts.toLocaleString()}</p>
            <CompletedPieChart completed={completed} />
         </div>
      </div>
   );
};
