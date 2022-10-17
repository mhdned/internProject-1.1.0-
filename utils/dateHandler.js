const moment = require('jalali-moment-timezone');

exports.dateToString = (date) => {
    return moment(date,'X').format("jYYYY/jMM/jDD (dddd) (hh:mm:ss)");
}
exports.dateToNumber = (date) => {}