import httpStatus from "http-status";
import {OFFENSE_DAO} from "../../../dao/v1/offenses/offenses.dao.js";
import {uploadImage} from "../../../utils/upload.js";
import {EMAIL} from "../../../utils/email.js";

const createOffense = async (req, res) => {
    try {
        const { image, offense_name, fine} = req.body;
        const {data: d, success: s, message: m} = await uploadImage(image, {resource_type: "image"});
        if (!s) {
            return res.status(httpStatus.BAD_REQUEST).json({message: m});
        }
        const {data, success: created, message} = await OFFENSE_DAO.createOffense({
            fine,
            offense_name,
            image: {...d}
        });
        if (!created) {
            return res.status(httpStatus.BAD_REQUEST).json({message});
        }
        await data.populate({path: 'driver'});
        await data.populate({path: 'vehicle'});
        const subject = `Notice of Traffic Offense - Urgent Response Required`;
        const text = EMAIL.generateEmail(
            `${data.driver.first_name} ${data.driver.last_name}`,
            data.created_at,
            offense_name,
            data.fine,
            data.vehicle
        );
        const {success: sent} = await EMAIL.sendEmail(data.driver.email, subject, text);
        if (sent) data.email_sent = sent;
        await data.save();
        res.status(httpStatus.OK).json({data: data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const registerOffense = async (req, res) => {
    try {
        const {fine, vehicle, offense_name, driver, image} = req.body;
        if (!fine || !vehicle || !offense_name || !driver || !image) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }
        const {data: d, success: s, message: m} = await uploadImage(image, {resource_type: "image"});
        if (!s) {
            return res.status(httpStatus.BAD_REQUEST).json({message: m});
        }
        const {code, data, message, success} = await OFFENSE_DAO.createOffense({
            fine,
            vehicle,
            offense_name,
            driver,
            image: {...d}
        });
        if (!success) {
            return res.status(code).json({message});
        }
        await data.populate({path: 'driver'});
        await data.populate({path: 'vehicle'});
        const subject = `Notice of Traffic Offense - Urgent Response Required`;
        const text = EMAIL.generateEmail(
            `${data.driver.first_name} ${data.driver.last_name}`,
            data.created_at,
            offense_name,
            data.fine,
            data.vehicle,
            data.image.secure_url
        );
        const {success: sent} = await EMAIL.sendEmail(data.driver.email, subject, text);
        if (success) data.email_sent = sent;
        await data.save();
        res.status(code).json({data, message});
    } catch (e) {
        console.log(e.message)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getOffense = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await OFFENSE_DAO.getOffense({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
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
        if(req.query.offense){match['offense_name'] = req.query.offense;}
        if(req.query.driver){match['driver'] = req.query.driver;}
        if(req.query.vehicle){match['vehicle'] = req.query.vehicle;}
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
        delete req.body['image'];
        const {success,data, message} = await OFFENSE_DAO.updateOffense(
            {_id: id}, req.body);
        if (!success) {
            return res.status(httpStatus.BAD_REQUEST).json({data, message});
        }
        res.status(httpStatus.OK).json({data, message: 'Offense updated'});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteOffense = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await OFFENSE_DAO.deleteOffense({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerOffense, getOffense, deleteOffense, updateOffense, getOffenses, createOffense};