import { IFunds, IReportsByDateDb } from "../services/firebase";

export function addAlertsToFunds(
   fundsDb: IFunds,
   reportsDb: IReportsByDateDb
): IFunds {
   const funds: IFunds = fundsDb;
   const reports = Object.values(reportsDb);
   const fundsIds = Object.keys(funds);

   for (const fundId of fundsIds) {
      const fund = funds[fundId];
      const subFundsIds = Object.keys(fund.subfunds);

      fund.alerts = 0;
      fund.report_status = true;

      for (const subFundId of subFundsIds) {
         const subFund = funds[fundId].subfunds[subFundId];
         const shareClassesIds = Object.keys(subFund.share_classes);

         subFund.alerts = 0;
         subFund.report_status = true;

         for (const shareClassId of shareClassesIds) {
            const shareClass =
               funds[fundId].subfunds[subFundId].share_classes[shareClassId];

            shareClass.alerts = reports[0][shareClass.uid].nb_alerts;
            shareClass.report_status = reports[0][shareClass.uid].report_status;

            subFund.alerts = subFund.alerts + shareClass.alerts;
            if (subFund.report_status)
               subFund.report_status =
                  subFund.report_status && shareClass.report_status;

            fund.alerts = fund.alerts + shareClass.alerts;
            if (fund.report_status)
               fund.report_status = fund.report_status && subFund.report_status;
         }
      }
   }
   return funds;
}
