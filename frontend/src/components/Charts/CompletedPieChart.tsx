import React from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

export const CompletedPieChart: React.FC<{ completed: number }> = function ({
   completed,
}) {
   const notCompleted = 1 - completed;
   const pieColors = ["#00b49fee", "#1111"];
   const pieData = [
      { name: "completed", value: completed },
      { name: "not completed", value: notCompleted },
   ];

   return (
      <ResponsiveContainer
         width="100%"
         height={200}
         minWidth={160}
         minHeight={160}
      >
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
                  value={`${Math.round(completed * 100)}%`}
                  position="center"
               />
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   );
};
