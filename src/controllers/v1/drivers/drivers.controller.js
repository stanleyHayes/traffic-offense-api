import httpStatus from "http-status";
import {DRIVER_DAO} from "../../../dao/v1/drivers/drivers.dao.js";

const registerDriver = async (req, res) => {
    try {
        const {first_name, last_name, email, license_id, address, phone} = req.body;
        if (!first_name || !last_name || !email || !license_id || !address || !phone) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }
        const {code, data, message, success} = await DRIVER_DAO.createDriver({
            first_name,
            last_name,
            email,
            license_id,
            address,
            phone
        });
        if (!success) {
            return res.status(code).json({message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getDriver = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await DRIVER_DAO.getDriver({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getDrivers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || {created_at: -1};
        const match = {};
        const options = {sort, limit, skip};
        const {code, data, message, count} = await DRIVER_DAO.getDrivers(match, options);
        res.status(code).json({data, message, count});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const searchDrivers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const {query} = req.query;
        const {data: drivers} = await DRIVER_DAO.getDrivers({});
        const results = drivers.filter(driver => {
            return driver.first_name.toLowerCase().includes(query.toLowerCase()) ||
                driver.last_name.toLowerCase().includes( query.toLowerCase()) ||
                driver.email.toLowerCase().includes( query.toLowerCase()) ||
                driver.license_id.toLowerCase().includes(query.toLowerCase()) ||
                driver.phone.toLowerCase().includes( query.toLowerCase()) ;
        });
        const paginatedResult = results.slice(skip, skip + limit);
        res.status(httpStatus.OK).json({message: 'Drivers retrieved', data: paginatedResult});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}



const updateDriver = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await DRIVER_DAO.updateDriver({_id: id}, req.body);
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        console.log(e.message)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteDriver = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await DRIVER_DAO.deleteDriver({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerDriver, getDriver, deleteDriver, updateDriver, getDrivers, searchDrivers};