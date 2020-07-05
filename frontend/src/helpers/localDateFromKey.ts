export function localDateFromKey(dateKey: string): string {
   const options = { year: "numeric", month: "short", day: "numeric" };

   const dateStr =
      dateKey.substr(0, 4) +
      "-" +
      dateKey.substr(4, 2) +
      "-" +
      dateKey.substr(6, 2);

   return new Date(dateStr).toLocaleDateString(navigator.language, options);
}
