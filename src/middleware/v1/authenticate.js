import jwt from  "jsonwebtoken";
import Admin from  "./../../models/v1/admin.model.js";
import {JWT_SECRET} from "./../../config/config.js";
import httpStatus from "http-status";

const authenticate = async (req, res, next) => {
    try {
        if(!req.headers['authorization'])
            return res.status(httpStatus.BAD_REQUEST).json({message: 'Authorization header required!'});
        const [bearer, token] = req.headers['authorization'].split(' ');
        if(bearer !== 'Bearer' || !token)
            return res.status(httpStatus.BAD_REQUEST).json({message: 'Invalid header format'});
        const decoded = jwt.verify(token, JWT_SECRET, null, null);
        const user = await Admin.findOne({_id: decoded._id});
        if(!user)
            return res.status(httpStatus.UNAUTHORIZED).json({message: `Session expired. Please login again!`});
        req.user = user;
        req.token = token;
        next();
    }catch (e) {
        console.log(e.message)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Session expired. Please login again!`});
    }
}

export {authenticate};