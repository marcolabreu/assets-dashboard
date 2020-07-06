import { database, pubsub } from "firebase-functions";

/*
Function to calculate and save totals on write server side so the frontend totals
component doesn't have to traverse the reports tree on every change
*/
export const updateTotalsOnWrite = database
   .ref("/reports_by_date")
   .onWrite((change, context) => {
      // TODO: implement
      if (context.authType === "ADMIN" || context.authType === "USER") {
         console.info(change.after.val(), "written by", context.authType);
      }
   });

/*
Additionally, a function to save final totals on schedule from closed days
*/
export const updateTotalsOnSchedule = pubsub
   .schedule("0 5 * * *")
   .timeZone("Europe/Luxembourg")
   .onRun(() => {
      // TODO: implement
      console.info(
         "Running on schedule at ",
         new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
         })
      );
   });
