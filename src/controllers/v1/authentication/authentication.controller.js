import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {ADMIN_DAO} from "../../../dao/v1/admins/admins.dao.js";
import {JWT_SECRET} from "./../../../config/config.js";

const register = async (req, res) => {
    try {
        const {first_name, last_name, email, username, password} = req.body;
        if (!first_name || !last_name || !email || !username || !password) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }
        const {
            code,
            data,
            message,
            success
        } = await ADMIN_DAO.createAdmin({
            first_name,
            last_name,
            email,
            username,
            password: await bcrypt.hash(password, 10)
        });
        if (!success) {
            return res.status(code).json({message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const login = async (req, res) => {
    try {
        const {username_or_email, password} = req.body;
        const {success, code, data, message} = await ADMIN_DAO.getAdmin({
            $or: [{email: username_or_email}, {username: username_or_email}]
        });
        if (!success) return res.status(code).json({data, message: "Auth Failed"});
        if (!await bcrypt.compare(password, data.password)) return res.status(code).json({
            data, message: "Auth Failed"
        });
        const token = jwt.sign({_id: data._id}, JWT_SECRET, {expiresIn: '30d'}, null);
        res.status(code).json({data, token, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getProfile = async (req, res) => {
    try {
        res.status(httpStatus.OK).json({data: req.user, message: "Profile successfully retrieved"});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const {password, old_password} = req.body;
        if (!await bcrypt.compare(old_password, req.admin.password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Auth Failed"});
        }
        const {success, code, data, message} = await ADMIN_DAO.updateAdmin(
            {_id: req.admin._id}, {password: await bcrypt.hash(password, 10)}
        );
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const updateProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await ADMIN_DAO.updateAdmin({_id: id}, req.body);
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const resetPassword = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await ADMIN_DAO.deleteAdmin({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const forgotPassword = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await ADMIN_DAO.deleteAdmin({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {register, login, getProfile, updatePassword, updateProfile, resetPassword, forgotPassword};