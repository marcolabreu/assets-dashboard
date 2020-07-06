import React from "react";
import {
   BarChart,
   Bar,
   Label,
   LabelList,
   ResponsiveContainer,
   XAxis,
} from "recharts";

import { ITotals } from "../Totals";

export const AlertsBarChart: React.FC<{ totals: ITotals[] }> = function ({
   totals,
}) {
   const chartData = totals.map(function (dayTotal) {
      return {
         alerts: dayTotal.alertsTotal,
         completed: dayTotal.completedReports / dayTotal.reportsCount,
         day: dayTotal.day,
      };
   });
   return (
      <>
         <ResponsiveContainer height={200} minWidth={200} minHeight={160}>
            <BarChart
               data={chartData}
               margin={{ top: 25, right: 0, left: 0, bottom: 15 }}
            >
               <Bar
                  dataKey="alerts"
                  name="alerts per day"
                  // FIXME: animation disables LabelList; a bug maybe?
                  isAnimationActive={false}
                  fill="#ffc658"
               >
                  <LabelList dataKey="alerts" position="top" />
               </Bar>
               <XAxis dataKey="day">
                  <Label
                     value="alerts on last days"
                     position="bottom"
                     offset={-3}
                  />
               </XAxis>
            </BarChart>
         </ResponsiveContainer>
      </>
   );
};
