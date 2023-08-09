const getYYYMMDD = (date) =>{
    var d = new Date(date);
    return d.toISOString().split('T')[0];
}
export {getYYYMMDD};