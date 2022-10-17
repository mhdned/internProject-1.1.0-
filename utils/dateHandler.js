const moment = require('jalali-moment-timezone');

exports.dateToString = (date) => {
    return moment(date,'X').format("jYYYY/jMM/jDD (hh::mm::ss)");
}