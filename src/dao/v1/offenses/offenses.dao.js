import Offense from "../../../models/v1/offense.model.js";
import httpStatus from "http-status";

const createOffense = async (offense) => {
    try {
        const createdOffense = await Offense.create({...offense});
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
        const offense = await Offense.findOne(params).populate({path: 'driver'}).populate({path: 'vehicle'});
        if (!offense) {
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
            data: offense
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
        const offense = await getOffense(params);
        if (!offense.success) {
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
            offense[key] = data[key];
        }
        await offense.save();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Offense updated successfully',
            data: offense
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
        const offense = await getOffense(params);
        if (!offense.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Offense not found',
                data: null
            }
        }
        await offense.remove();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Offense removed successfully',
            data: offense
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
        const offenses = await Offense.find(match).sort(options?.sort).limit(options?.limit).skip(options?.skip).populate({path: 'driver'}).populate({path: 'vehicle'});
        const offensesCount = await Offense.find(match).sort(options?.sort).limit(options?.limit).skip(options?.skip).countDocuments();
        return {
            success: true,
            data: offenses,
            code: httpStatus.OK,
            message: `${offensesCount} offenses retrieved`,
            count: offensesCount

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