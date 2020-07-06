import React from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

export const CompletedPieChart: React.FC<{
   completed: number;
   percentageStyle: string;
}> = function ({ completed, percentageStyle }) {
   const notCompleted = 1 - completed;
   // TODO: replace this by theme colors
   const pieColors = ["#00b49fee", "#1111"];
   const pieData = [
      { name: "completed", value: completed },
      { name: "not completed", value: notCompleted },
   ];

   return (
      <ResponsiveContainer minWidth={160}>
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
                  value={`${Math.round(completed * 100)}%`}
               />
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   );
};