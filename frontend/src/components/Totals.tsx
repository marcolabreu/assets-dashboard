import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

import { db, IReportsByDate } from "../services/firebase";
import { localDateFromKey } from "../helpers/localDateFromKey";
import { AlertsBarChart } from "./Charts/AlertsBarChart";
import { CompletedPieChart } from "./Charts/CompletedPieChart";

export interface ITotals {
   alertsTotal: number;
   completedReports: number;
   reportsCount: number;
}

const styles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "row",
      justifyItems: "center",
   },
});

export const Totals: React.FC = function () {
   const [totals, setTotals] = useState<Array<ITotals>>([]);
   const [date, setDate] = useState("Reports date");
   const classes = styles();

   useEffect(() => {
      function observeLastDayReports() {
         const reports_by_date = db.ref("reports_by_date");

         reports_by_date
            .orderByValue()
            .limitToLast(7)
            .on("value", function (dataSnapshot) {
               const data: IReportsByDate = dataSnapshot.val();

               const dateKeys = Object.keys(data);
               const localLastDate = localDateFromKey(
                  dateKeys[dateKeys.length - 1]
               );

               const reportsTotals: ITotals[] = [];

               Object.values(data).forEach(function (dateEntry) {
                  const reduced = Object.values(dateEntry).reduce<ITotals>(
                     function (acc, shareClassEntry) {
                        const { nb_alerts, report_status } = shareClassEntry;

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
                  console.log(reduced);
                  reportsTotals.push(reduced);
               });

               setTotals(reportsTotals);
               setDate(localLastDate);
            });
      }

      void observeLastDayReports();
   }, []);

   const lastDayCompleted =
      totals.length === 0
         ? 0
         : totals[totals.length - 1].completedReports /
           totals[totals.length - 1].reportsCount;

   return (
      <div className={classes.container}>
         <div>
            <h2>{date}</h2>
         </div>
         <CompletedPieChart completed={lastDayCompleted} />
         <AlertsBarChart totals={totals} />
      </div>
   );
};
