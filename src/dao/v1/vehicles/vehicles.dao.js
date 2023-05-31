import Vehicle from "../../../models/v1/vehicle.model.js";
import httpStatus from "http-status";

const createVehicle = async (vehicle) => {
    try {
        const existingVehicle = await Vehicle.findOne({
            number_plate: vehicle.number_plate
        });
        // if vehicle already exists, return with error
        if (existingVehicle) {
            return {
                success: false,
                message: 'Vehicle with number plate already exist',
                code: httpStatus.CONFLICT,
                data: null
            }
        }
        const createdVehicle = await Vehicle.create({...vehicle});
        return {
            success: true,
            message: 'Vehicle registered successfully',
            code: httpStatus.CREATED,
            data: createdVehicle
        }
    } catch (e) {
        return {
            success: false,
            message: e.message,
            code: httpStatus.INTERNAL_SERVER_ERROR,
            data: null
        }
    }
}

const getVehicle = async (params) => {
    try {
        const vehicle = await Vehicle.findOne(params);
        if (!vehicle) {
            return {
                success: false,
                message: 'Vehicle not found',
                code: httpStatus.NOT_FOUND,
                data: null
            }
        }
        return {
            success: true,
            message: 'Vehicle retrieved successfully',
            code: httpStatus.OK,
            data: vehicle
        }
    } catch (e) {
        return {
            success: false,
            message: e.message,
            code: httpStatus.INTERNAL_SERVER_ERROR,
            data: null
        }
    }
}


const updateVehicle = async (params, data) => {
    try {
        const vehicle = await getVehicle(params);
        if (!vehicle.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Vehicle not found',
                data: null
            }
        }

        const updates = Object.keys(data);
        const allowedUpdates = ['color', 'year', 'make', 'model'];
        const allowed = updates.every(update => allowedUpdates.includes(update));
        if (!allowed) {
            return {
                success: false,
                code: httpStatus.BAD_REQUEST,
                message: 'Updates not allowed',
                data: null
            }
        }
        for (let key of data) {
            vehicle[key] = data[key];
        }
        await vehicle.save();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Vehicle updated successfully',
            data: vehicle
        }
    } catch (e) {
        return {
            success: false,
            message: e.message,
            code: httpStatus.INTERNAL_SERVER_ERROR,
            data: null
        }
    }
}


const deleteVehicle = async (params) => {
    try {
        const vehicle = await getVehicle(params);
        if (!vehicle.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Vehicle not found',
                data: null
            }
        }
        await vehicle.remove();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Vehicle removed successfully',
            data: vehicle
        }
    } catch (e) {
        return {
            success: false,
            message: e.message,
            code: httpStatus.INTERNAL_SERVER_ERROR,
            data: null
        }
    }
}

const getVehicles = async (match, options) => {
    try {
        const vehicles = await Vehicle.find(match).sort(options.sort).limit(options.limit).skip(options.skip);
        const vehiclesCount = await Vehicle.find(match).sort(options.sort).limit(options.limit).skip(options.skip).countDocuments();
        return {
            success: true,
            data: vehicles,
            code: httpStatus.OK,
            message: `${vehiclesCount} vehicles retrieved`,
            count: vehiclesCount

        }
    } catch (e) {
        return {
            success: false,
            message: e.message,
            code: httpStatus.INTERNAL_SERVER_ERROR,
            data: null
        }
    }
}

export const VEHICLE_DAO = {createVehicle, getVehicle, updateVehicle, deleteVehicle, getVehicles};