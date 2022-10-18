/*------<ERROR HANDLER UTILS>------*/
exports.showError = async function(res,error,message,status = 500){
    console.log(error);
    res.status(status).send(message);
}

exports.logRes = async function(res,value){
    console.log(value);
    res.status(500).send(`Value : ((${value})) | Type : ((${typeof value}))`);
}