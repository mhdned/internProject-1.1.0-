/*------<INTIATE PAYMENT CONTROLLER>------*/
const Payment = require("./../model/paymentModel");
/*------<MRTHODS PAYMENT CONTROLLER>------*/
exports.createPayment = async (infoPay) =>{
    try {
        return await Payment.create(infoPay);
    } catch (error) {
        return false
    }
}