import { database, initializeApp } from "firebase";

/*
Create a file named '.env.development' at your project's root with your env vars or use
'direnv' and '.envrc' file. The values needed for your project are available at
https://console.firebase.google.com/project/YOUR_PROJECT_NAME/settings/general/.
Environment variables MUST start with REACT_APP if generated with react-create-app.
*/
const config = {
   apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
   databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
   projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
};

initializeApp(config);
export const db = database();

export interface IReportsByDate {
   [date: string]: {
      [uid: string]: {
         nb_alerts: number;
         report_status: boolean;
      };
   };
}

export interface IFunds {
   [fund_id: string]: {
      name: string;
      subfunds: {
         [subfund_id: string]: {
            name: string;
            share_classes: {
               [share_class_id: string]: {
                  name: string;
                  uid: string;
               };
            };
         };
      };
   };
}
