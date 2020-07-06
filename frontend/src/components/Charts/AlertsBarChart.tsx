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
      };
   });
   return (
      <>
         <ResponsiveContainer
            width="100%"
            height={200}
            minWidth={240}
            minHeight={160}
         >
            <BarChart
               data={chartData}
               margin={{ top: 25, right: 0, left: 0, bottom: 15 }}
            >
               <Bar
                  dataKey="alerts"
                  name="alerts per day"
                  isAnimationActive={false}
                  fill="#ffc658"
               >
                  <LabelList dataKey="alerts" position="top" />
               </Bar>
               <XAxis dataKey="day">
                  <Label value="alerts each day" />
               </XAxis>
            </BarChart>
         </ResponsiveContainer>
      </>
   );
};
