import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { db, IReportsByDate } from "../services/firebase";
import { Loading } from "./Loading";
import { localDateFromKey } from "../helpers/localDateFromKey";

const styles = makeStyles({
   container: {
      display: "flex",
      flexDirection: "row",
      justifyItems: "center",
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

   const notCompleted = 1 - completed;
   const pieColors = ["#00b49fee", "#1111"];
   const pieData = [
      { name: "completed", value: completed },
      { name: "not completed", value: notCompleted },
   ];

   return (
      <div className={classes.container}>
         <PieChart width={140} height={140}>
            <Pie
               data={pieData}
               dataKey="value"
               animationEasing="ease-in-out"
               fill={pieColors[0]}
               innerRadius={40}
               paddingAngle={1}
               startAngle={90}
               endAngle={-360}
            >
               {pieData.map((entry, index) => (
                  <Cell
                     key={`cell-${index}`}
                     fill={pieColors[index % pieColors.length]}
                  />
               ))}
               <Label
                  value={`${Math.round(completed * 100)}%`}
                  position="center"
               />
            </Pie>
         </PieChart>
         <div>
            <h2>{date}</h2>
            <p>{alerts.toLocaleString()}</p>
         </div>
      </div>
   );
};
