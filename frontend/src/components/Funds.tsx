import React, { useEffect, useState } from "react";
import { List } from "@material-ui/core";

import { db, IFunds, IReportsByDateDb } from "../services/firebase";
import { addAlertsToFunds } from "../helpers/addAlertsToFunds";
import { FundListItem } from "./FundListItem";

export const Funds: React.FC = function () {
   const [funds, setFunds] = useState<IFunds | undefined>(undefined);
   const [fundsDb, setFundsDb] = useState<IFunds | undefined>(undefined);
   const [lastDayReportsDb, setLastDayReportsDb] = useState<
      IReportsByDateDb | undefined
   >(undefined);

   useEffect(() => {
      if (fundsDb && lastDayReportsDb) {
         setFunds(addAlertsToFunds(fundsDb, lastDayReportsDb));
      }
   }, [fundsDb, lastDayReportsDb]);

   useEffect(() => {
      function observeFunds() {
         const reports_by_date = db.ref("reports_by_date");
         const funds_db = db.ref("funds");

         reports_by_date
            .orderByValue()
            .limitToLast(1)
            .on("value", function (dataSnapshot) {
               const data: IReportsByDateDb = dataSnapshot.val();
               setLastDayReportsDb(data);
            });

         funds_db.on("value", function (dataSnapshot) {
            const data: IFunds = dataSnapshot.val();
            setFundsDb(data);
         });
      }

      void observeFunds();
      // TODO: check if we need to cleanup this useEffect with a return
   }, []);

   if (funds) console.log(funds);

   return (
      <>
         {funds && (
            <List aria-label="funds">
               {Object.entries(funds).map(
                  ([fund_id, { alerts, name, report_status, subfunds }]) => (
                     <FundListItem
                        alerts={alerts}
                        key={fund_id}
                        name={name}
                        report_status={report_status}
                        subfunds={subfunds}
                     />
                  )
               )}
            </List>
         )}

         {/*<pre>{JSON.stringify(funds, undefined, 2)}</pre>*/}
      </>
   );
};
