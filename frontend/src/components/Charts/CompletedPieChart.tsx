import React from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

export const CompletedPieChart: React.FC<{
   completedCount: number;
   totalCount: number;
   percentageStyle: string;
}> = function ({ completedCount, totalCount, percentageStyle }) {
   const completedPercentage = completedCount / totalCount;
   const pendingPercentage = 1 - completedPercentage;

   // TODO: replace with theme colors
   const pieColors = ["#00b49f", "#000"];
   const pieData = [
      { name: "completed", value: completedPercentage },
      { name: "not completed", value: pendingPercentage },
   ];

   return (
      <ResponsiveContainer minWidth={160} maxHeight={180}>
         <PieChart>
            <Pie
               data={pieData}
               dataKey="value"
               animationEasing="ease-in-out"
               fill={pieColors[0]}
               innerRadius="60%"
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
                  className={percentageStyle}
                  position="center"
                  value={completedCount ?? 0}
               />
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   );
};
