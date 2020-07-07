import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

import { db, IReportsByDateDb } from "../services/firebase";
import { localDateFromKey } from "../helpers/localDateFromKey";
import { AlertsBarChart } from "./Charts/AlertsBarChart";
import { CompletedPieChart } from "./Charts/CompletedPieChart";

export interface ITotals {
   alertsTotal: number;
   completedReports: number;
   reportsCount: number;
   day: number;
}

export const useStyles = makeStyles({
   alerts: {
      color: "red",
      fontSize: "xx-large",
      fontWeight: "bold",
   },
   column: {
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
   },
   row: {
      display: "flex",
      flexDirection: "row",
      justifyItems: "space-between",
   },
   xLarge: {
      //FIXME: color not applied to Recharts Label component
      color: "grey",
      fontSize: "x-large",
   },
});

export const Totals: React.FC = function () {
   const [totals, setTotals] = useState<Array<ITotals>>([]);
   const [date, setDate] = useState("Reports date");
   const styles = useStyles();
   const theme = useTheme();

   const mobile = useMediaQuery(theme.breakpoints.down("xs"));

   useEffect(() => {
      function observeLastDayReports() {
         const reports_by_date = db.ref("reports_by_date");

         reports_by_date
            .orderByValue()
            // TODO: Make the limit responsive to screen width
            .limitToLast(8)
            .on("value", function (dataSnapshot) {
               const data: IReportsByDateDb = dataSnapshot.val();

               const dateKeys = Object.keys(data);
               const localLastDate = localDateFromKey(
                  dateKeys[dateKeys.length - 1]
               );

               const reportsTotals: ITotals[] = [];

               Object.values(data).forEach(function (dateEntry, index) {
                  const day = Number(dateKeys[index].substr(6, 2));

                  const reduced = Object.values(dateEntry).reduce<
                     Pick<
                        ITotals,
                        "alertsTotal" | "completedReports" | "reportsCount"
                     >
                  >(
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

                  reportsTotals.push({ ...reduced, day });
               });

               setTotals(reportsTotals);
               setDate(localLastDate);
            });
      }

      void observeLastDayReports();
      // TODO: check if we need to cleanup this useEffect with a return
   }, []);

   const completedOnLastAvailableDate =
      totals.length === 0
         ? 0
         : totals[totals.length - 1].completedReports /
           totals[totals.length - 1].reportsCount;

   const alertsOnLastAvailableDate =
      totals.length === 0 ? 0 : totals[totals.length - 1].alertsTotal;

   return (
      <div className={mobile ? styles.column : styles.row}>
         <div className={styles.row}>
            <div>
               <p className={styles.xLarge}>{date}</p>
               <p className={styles.alerts}>{alertsOnLastAvailableDate}</p>
            </div>
            <CompletedPieChart
               completed={completedOnLastAvailableDate}
               percentageStyle={styles.xLarge}
            />
         </div>
         <AlertsBarChart totals={totals} />
      </div>
   );
};
