import Offense from "../../../models/v1/offense.model.js";
import httpStatus from "http-status";

const createOffense = async (driver) => {
    try {
        const existingOffense = await Offense.findOne({
            email: driver.email
        });
        // if driver already exists, return with error
        if (existingOffense) {
            return {
                success: false,
                message: 'Offense with email already exist',
                code: httpStatus.CONFLICT,
                data: null
            }
        }
        const createdOffense = await Offense.create({...driver});
        return {
            success: true,
            message: 'Offense registered successfully',
            code: httpStatus.CREATED,
            data: createdOffense
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

const getOffense = async (params) => {
    try {
        const driver = await Offense.findOne(params);
        if (!driver) {
            return {
                success: false,
                message: 'Offense not found',
                code: httpStatus.NOT_FOUND,
                data: null
            }
        }
        return {
            success: true,
            message: 'Offense retrieved successfully',
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


const updateOffense = async (params, data) => {
    try {
        const driver = await getOffense(params);
        if (!driver.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Offense not found',
                data: null
            }
        }
        const updates = Object.keys(data);
        const allowedUpdates = ['fine', 'offense_name'];
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
            driver[key] = data[key];
        }
        await driver.save();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Offense updated successfully',
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


const deleteOffense = async (params) => {
    try {
        const driver = await getOffense(params);
        if (!driver.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Offense not found',
                data: null
            }
        }
        await driver.remove();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Offense removed successfully',
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

const getOffenses = async (match, options) => {
    try {
        const drivers = await Offense.find(match).sort(options.sort).limit(options.limit).skip(options.skip);
        const driversCount = await Offense.find(match).sort(options.sort).limit(options.limit).skip(options.skip).countDocuments();
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

export const OFFENSE_DAO = {createOffense, getOffense, updateOffense, deleteOffense, getOffenses};