import Admin from "../../../models/v1/admin.model.js";
import httpStatus from "http-status";

const createAdmin = async (admin) => {
    try {
        const existingAdmin = await Admin.findOne({
            email: admin.email
        });
        // if admin already exists, return with error
        if (existingAdmin) {
            return {
                success: false,
                message: 'Admin with email already exist',
                code: httpStatus.CONFLICT,
                data: null
            }
        }
        const createdAdmin = await Admin.create({...admin});
        return {
            success: true,
            message: 'Admin registered successfully',
            code: httpStatus.CREATED,
            data: createdAdmin
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

const getAdmin = async (params) => {
    try {
        const admin = await Admin.findOne(params);
        if (!admin) {
            return {
                success: false,
                message: 'Admin not found',
                code: httpStatus.NOT_FOUND,
                data: null
            }
        }
        return {
            success: true,
            message: 'Admin retrieved successfully',
            code: httpStatus.OK,
            data: admin
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


const updateAdmin = async (params, data) => {
    try {
        const admin = await getAdmin(params);
        if (!admin.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Admin not found',
                data: null
            }
        }

        const updates = Object.keys(data);
        const allowedUpdates = ['first_name', 'last_name', 'address', 'email'];
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
            admin[key] = data[key];
        }
        await admin.save();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Admin updated successfully',
            data: admin
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


const deleteAdmin = async (params) => {
    try {
        const admin = await getAdmin(params);
        if (!admin.success) {
            return {
                success: false,
                code: httpStatus.NOT_FOUND,
                message: 'Admin not found',
                data: null
            }
        }
        await admin.remove();
        return {
            success: true,
            code: httpStatus.OK,
            message: 'Admin removed successfully',
            data: admin
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

const getAdmins = async (match, options) => {
    try {
        const admins = await Admin.find(match).sort(options?.sort).limit(options?.limit).skip(options?.skip);
        const adminsCount = await Admin.find(match).sort(options?.sort).limit(options?.limit).skip(options?.skip).countDocuments();
        return {
            success: true,
            data: admins,
            code: httpStatus.OK,
            message: `${adminsCount} admins retrieved`,
            count: adminsCount

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

export const ADMIN_DAO = {createAdmin, getAdmin, updateAdmin, deleteAdmin, getAdmins};