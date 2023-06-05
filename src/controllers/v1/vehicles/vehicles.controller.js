import httpStatus from "http-status";
import {VEHICLE_DAO} from "../../../dao/v1/vehicles/vehicles.dao.js";

const registerVehicle = async (req, res) => {
    try {
        const {number_plate, driver, color, year, make, model} = req.body;
        if (!number_plate || !driver || !color || !year || !make || !model) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }
        const {code, data, message, success} = await VEHICLE_DAO.createVehicle({
            number_plate,
            driver,
            color,
            year,
            make,
            model
        });
        if (!success) {
            return res.status(code).json({message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        console.log(e.message)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getVehicle = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await VEHICLE_DAO.getVehicle({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getVehicles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || {created_at: -1};
        const match = {};
        if (req.query.driver) {
            match['driver'] = req.query.driver;
        }
        const options = {sort, limit, skip};
        const {code, data, message, count} = await VEHICLE_DAO.getVehicles(match, options);
        res.status(code).json({data, message, count});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const searchVehicles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const {query} = req.query;
        const {data: vehicles} = await VEHICLE_DAO.getVehicles({});
        const results = vehicles.filter(vehicle => {
            return vehicle.number_plate.toLowerCase().includes(query.toLowerCase()) ||
                vehicle.color.toLowerCase().includes( query.toLowerCase()) ||
                vehicle.make.toLowerCase().includes( query.toLowerCase()) ||
                vehicle.year.toLowerCase().includes( query.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(query.toLowerCase());
        });
        const paginatedResult = results.slice(skip, skip + limit);
        res.status(httpStatus.OK).json({message: 'Vehicles retrieved', data: paginatedResult});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


const updateVehicle = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await VEHICLE_DAO.updateVehicle({_id: id}, req.body);
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await VEHICLE_DAO.deleteVehicle({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerVehicle, getVehicle, deleteVehicle, updateVehicle, getVehicles, searchVehicles};