export const dateFormat = (date: Date)=>{
    // return date.toISOString().slice(0,10);
    let dateDoubleDigits = '';
    let monthDoubleDigits = '';

    monthDoubleDigits = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}`: `${date.getMonth() +1 }`
    dateDoubleDigits = date.getDate() < 10 ? `0${date.getDate()}`: `${date.getDate()}`
    

    return `${monthDoubleDigits}-${dateDoubleDigits}-${date.getFullYear()}`;
}