import { database, pubsub } from "firebase-functions";

export const updateTotalsOnWrite = database
  .ref("/reports_by_date")
  .onWrite((change, context) => {
    if (context.authType === "ADMIN" || context.authType === "USER") {
      console.info(change.after.val(), "written by", context.authType);
    }
  });

export const updateTotalsOnSchedule = pubsub
  .schedule("every day at 5:30 AM")
  .onRun((context) => {
    console.info("running on context ", context.authType);
  });