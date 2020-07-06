import { parse, ParseResult } from "papaparse";

const fs = require("fs");
const args = process.argv.slice(2);

interface RawCsvParsingResult {
   index: string;
   fund_name: string;
   fund_id: string;
   subfund_name: string;
   subfund_id: string;
   share_class_name: string;
   share_class_id: string;
   date: string;
   report_status: string;
   nb_alerts: string;
}

// TODO: improve / refactor this function
const hash = function (str: string) {
   let h1 = 0xe9a40c51;
   let h2 = 0xb444e029;

   for (let i = 0; i < str.length; i++) {
      h1 ^= str.charCodeAt(i);
      h2 ^= str.charCodeAt(i);
      h1 += (h1 << 1) + (h1 << 4) + (h1 << 7) + (h1 << 8) + (h1 << 24);
      h2 += (h1 << 1) + (h1 << 4) + (h1 << 7) + (h1 << 8) + (h1 << 24);
   }
   return (
      ("000000" + (h1 >>> 0).toString(16)).substr(-6) +
      ("000000" + (h2 >>> 0).toString(16)).substr(-6)
   );
};

try {
   const srcFile = "data/" + args[0];
   const destFileName = "data/" + args[0].split(".")[0];
   const csvBuffer = fs.readFileSync(srcFile, { encoding: "utf8" });

   const rawParseResults: ParseResult<RawCsvParsingResult> = parse(
      csvBuffer.toString(),
      {
         complete: function (result) {
            if (result.errors.length > 0) console.error(result.errors);
         },
         header: true,
      }
   );

   const funds: any = {};
   const reports_by_date: any = {};
   const reports_by_uid: any = {};

   rawParseResults.data.forEach((row) => {
      const uid = hash(row.fund_id + row.subfund_id + row.share_class_id);

      // Reports by date
      if (!(row.date in reports_by_date)) reports_by_date[`${row.date}`] = {};
      if (!(uid in reports_by_date[`${row.date}`])) {
         reports_by_date[`${row.date}`][`${uid}`] = {
            report_status: row.report_status === "True",
            nb_alerts: parseInt(row.nb_alerts),
         };
      }

      // Reports by uid
      if (!(uid in reports_by_uid)) reports_by_uid[`${uid}`] = {};
      if (!(row.date in reports_by_uid[`${uid}`])) {
         reports_by_uid[`${uid}`][`${row.date}`] = {
            report_status: row.report_status === "True",
            nb_alerts: parseInt(row.nb_alerts),
         };
      }

      // Funds
      if (!(row.fund_id in funds))
         funds[`${row.fund_id}`] = {
            name: row.fund_name,
            subfunds: {},
         };

      if (!(row.subfund_id in funds[`${row.fund_id}`].subfunds))
         funds[`${row.fund_id}`].subfunds[`${row.subfund_id}`] = {
            name: row.subfund_name,
            share_classes: {},
         };

      if (
         !(
            row.share_class_id in
            funds[`${row.fund_id}`].subfunds[`${row.subfund_id}`].share_classes
         )
      )
         funds[`${row.fund_id}`].subfunds[`${row.subfund_id}`].share_classes[
            `${row.share_class_id}`
         ] = {
            name: row.share_class_name,
            uid,
         };
   });

   fs.writeFileSync(destFileName + "_funds.json", JSON.stringify(funds));
   fs.writeFileSync(
      destFileName + "_by_date.json",
      JSON.stringify(reports_by_date)
   );
   fs.writeFileSync(
      destFileName + "_by_uid.json",
      JSON.stringify(reports_by_uid)
   );
} catch (e) {
   console.error(e);
}
