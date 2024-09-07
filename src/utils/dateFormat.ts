export const dateFormat = (date: Date)=>{
    return date.toISOString().slice(0,10);
    return `${date.getMonth()+1}-${date.getUTCDate()}-${date.getFullYear()}`
}