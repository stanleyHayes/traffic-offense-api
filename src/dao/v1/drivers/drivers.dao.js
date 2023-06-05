import Driver from "../../../models/v1/driver.model.js";
import httpStatus from "http-status";

const createDriver = async (driver) => {
    try {
        const existingDriver = await Driver.findOne({
            email: driver.email
        });
        // if driver already exists, return with error
        if (existingDriver) {
            return {
                success: false,
                message: 'Driver with email already exist',
                code: httpStatus.CONFLICT,
                data: null
            }
        }
        const createdDriver = await Driver.create({...driver});
        return {
            success: true,
            message: 'Driver registered successfully',
            code: httpStatus.CREATED,
            data: createdDriver
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

const getDriver = async (params) => {
    try {
        const driver = await Driver.findOne(params);
        if (!driver) {
            return {
                success: false,
                message: 'Driver not found',
                code: httpStatus.NOT_FOUND,
                data: null
            }
        }
        return {
            success: true,
            message: 'Driver retrieved successfully',
            code: httpStatus.OK,
            data: driver
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


const updateDriver = async (params, data) => {
    try {
        const driver = await getDriver(params);
        if (!driver.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Driver not found',
                data: null
            }
        }

        const updates = Object.keys(data);
        const allowedUpdates = ['first_name', 'last_name', 'address', 'email', 'address', 'phone', 'license_id'];
        const allowed = updates.every(update => allowedUpdates.includes(update));
        if (!allowed) {
            return {
                success: false,
                code: httpStatus.BAD_REQUEST,
                message: 'Updates not allowed',
                data: null
            }
        }
        for (let key of updates) {
            driver.data[key] = data[key];
        }
        await driver.data.save();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Driver updated successfully',
            data: driver.data
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


const deleteDriver = async (params) => {
    try {
        const {data, success} = await getDriver(params);
        if (!success) {
            return {
                success,
                code: httpStatus.NOT_FOUND,
                message: 'Driver not found',
                data: null
            }
        }
        await data.remove();
        return {
            success,
            code: httpStatus.OK,
            message: 'Driver removed successfully',
            data
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

const getDrivers = async (match, options = {sort: {created_at: -1}, skip: 0, limit: 50}) => {
    try {
        const drivers = await Driver.find(match).sort(options?.sort).limit(options?.limit).skip(options?.skip);
        const driversCount = await Driver.find(match).sort(options?.sort).limit(options?.limit).skip(options?.skip).countDocuments();
        return {
            success: true,
            data: drivers,
            code: httpStatus.OK,
            message: `${driversCount} drivers retrieved`,
            count: driversCount

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

export const DRIVER_DAO = {createDriver, getDriver, updateDriver, deleteDriver, getDrivers};