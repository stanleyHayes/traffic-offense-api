import httpStatus from "http-status";
import {OFFENSE_DAO} from "../../../dao/v1/offenses/offenses.dao.js";
import {uploadImage} from "../../../utils/upload.js";

const registerOffense = async (req, res) => {
    try {
        const {fine, vehicle, offense_name, driver, image} = req.body;
        if (!fine || !vehicle || !offense_name || !driver || !image) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }

        const {data: d ,  success: s, message: m} = await uploadImage(image, {resource_type: "image"});
        if(!s){
            return res.status(httpStatus.BAD_REQUEST).json({message: m});
        }

        const {code, data, message, success} = await OFFENSE_DAO.createOffense({
            fine,
            vehicle,
            offense_name,
            driver,
            image: {...d}
        });
        if (!success) {return res.status(code).json({message});}
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getOffense = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await OFFENSE_DAO.getOffense({_id: id});
        if (!success) {return res.status(code).json({data, message});}
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getOffenses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || {created_at: -1};
        const match = {};
        const options = {sort, limit, skip};
        const {code, data, message, count} = await OFFENSE_DAO.getOffenses(match, options);
        res.status(code).json({data, message, count});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


const updateOffense = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await OFFENSE_DAO.updateOffense({_id: id}, req.body);
        if (!success) {return res.status(code).json({data, message});}
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteOffense = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await OFFENSE_DAO.deleteOffense({_id: id});
        if (!success) {return res.status(code).json({data, message});}
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerOffense, getOffense, deleteOffense, updateOffense, getOffenses};