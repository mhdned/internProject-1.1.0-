const moment = require('jalali-moment-timezone');

exports.dateToString = (date) => {
    return moment(date,'X').format("jYYYY/jMM/jDD | (hh:mm:ss)");
}
exports.dateToNumber = (date) => {
    date = moment(date,'X').format("jYYYY/jMM/jDD/hh:mm:ss:A");
    console.log(moment(date,"jYYYY/jMM/jDD/hh:mm:ss:A").fromNow());
}