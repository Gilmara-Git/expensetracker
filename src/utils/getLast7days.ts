export const getRecentPastDays = (date: Date, numOfPastDays: number)=>{
   return new Date(date.getFullYear(), date.getMonth(), date.getUTCDate() - numOfPastDays);
};