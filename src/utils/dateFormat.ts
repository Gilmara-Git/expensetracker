export const dateFormat = (date: Date)=>{
    return `${date.getMonth()+1}-${date.getUTCDate()}-${date.getFullYear()}`
}