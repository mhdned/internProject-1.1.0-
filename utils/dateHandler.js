/*------<IMPORT MOMENT>------*/
const moment = require('moment-timezone');
/*------<MOMENT HELPER>------*/
exports.dateToString = (date) => {
    // console.log(date);
    return moment(date,'x').tz('Asia/Tehran').format(`YYYY/MM/DD`);
}
/*------<TEST FUNCTION>------*/
exports.dateToNumber = (date) => {
    date = moment(date,'X').format("jYYYY/jMM/jDD/hh:mm:ss:A");
    console.log(moment(date,"jYYYY/jMM/jDD/hh:mm:ss:A").fromNow());
}