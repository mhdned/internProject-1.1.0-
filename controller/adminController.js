/*------<INTIATE ADMIN CONTROLLER>------*/
const Request = require("./../model/requestModel");
/*------<MRTHODS REQUEST CONTROLLER>------*/
exports.allRequests = async(req,res)=>{
    try {
        if(req.userData.role !== 'admin'){
            return res
            .status(403)
            .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
        }
        if (req.body.status) {
            req.statusReq = {status : req.body.status}
        }else{
            req.statusReq = {}
        }
        const allRequest = await Request.find(req.statusReq);
        res.status(200).json({
            message : "all request",
            data : allRequest
        })
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
};
exports.singleRequest = async(req,res)=>{
    try {
        if(req.userData.role !== 'admin'){
            return res
            .status(403)
            .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
        }
        const request = await Request.findById(req.params.id);
        res.status(200).json({
            message : "all request",
            data : request
        })
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
};
exports.changeRequestStatus = async(req,res)=>{
    try {
        if(req.userData.role !== 'admin'){
            return res
            .status(403)
            .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
        }

        const request = await Request.findByIdAndUpdate(
            req.params.id,{status : req.body.status},{new : true}
        );
        res.status(200).json({
            message : "all request",
            data : request,
        })
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
};
exports.deleteRequest = async(req,res)=>{
    try {
        if(req.userData.role !== 'admin'){
            return res
            .status(403)
            .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
        }

        const request = await Request.findByIdAndDelete(req.params.id);
        res.status(202).send("DELETED");
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
};