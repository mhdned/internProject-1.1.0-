/*------<INTIATE USER DB CONTROLLER>------*/
const User = require("./../model/userModel");
const asyncHandler = require("express-async-handler");
const {showError,logRes} = require("./../../utils/errorHandlet")
class UserDB 
{
    /*------<INTIATE USER DB CONSTRUCT>------*/
    constructor(){}
    /*------<INTIATE USER DB CONTROLLER METHOD>------*/
    create(userInfo){
        asyncHandler(async (req,res,next) => {
            try {
                req.user = await User.create(userInfo);
            } catch (error) {
                return showError(res,error,"ERROR SERVER | USER | NOT CREATED")
            }
        })
    }
    all(parameter){
        asyncHandler(async (req,res,next) => {
            try {
                req.user = await User.find(parameter);
            } catch (error) {
                return showError(res,error,"ERROR SERVER | USER | NOT CREATED")
            }
        })
    }
    single(){}
    update(){}
    delete(){}
    softDelete(){}

    createInstance(){return new UserDB()}
}

module.exports = UserDB;