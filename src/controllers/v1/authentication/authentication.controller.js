import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {ADMIN_DAO} from "../../../dao/v1/admins/admins.dao.js";
import {JWT_SECRET} from "./../../../config/config.js";
import {EMAIL} from "../../../utils/email.js";

const register = async (req, res) => {
    try {
        const {first_name, last_name, email, username, password, permissions, phone} = req.body;
        if (!first_name || !last_name || !email || !username || !password || !phone) {
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
            password: await bcrypt.hash(password, 10),
            permissions,
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

const login = async (req, res) => {
    try {
        const {username_or_email, password} = req.body;
        const {success, code, data} = await ADMIN_DAO.getAdmin({
            $or: [{email: username_or_email}, {username: username_or_email}]
        });
        if (!success) return res.status(httpStatus.UNAUTHORIZED).json({data: null, message: "Auth Failed"});
        if (!await bcrypt.compare(password, data.password))
            return res.status(httpStatus.UNAUTHORIZED).json({data: null, message: "Auth Failed"});
        const token = jwt.sign({_id: data._id}, JWT_SECRET, {expiresIn: '30d'}, null);
        res.status(code).json({data, token, message: "Logged in successfully"});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getProfile = async (req, res) => {
    try {
        res.status(httpStatus.OK).json({data: req.user, token: req.token, message: "Profile successfully retrieved"});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const {password, current_password} = req.body;
        if (!await bcrypt.compare(current_password, req.user.password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Auth Failed"});
        }
        const {success} = await ADMIN_DAO.updateAdmin(
            {_id: req.user._id},
            {password: await bcrypt.hash(password, 10)
            });
        if (!success) {
            return res.status(httpStatus.BAD_REQUEST).json({message: 'Password not updated'});
        }
        res.status(httpStatus.OK).json({message: 'Password updated successfully'});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const updateProfile = async (req, res) => {
    try {
        const {success, code, data, message} = await ADMIN_DAO.updateAdmin(
            {_id: req.user._id}, req.body
        );
        if (!success) {
            return res.status(httpStatus.BAD_REQUEST).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        jwt.verify(token, JWT_SECRET, null, null);
        const {success} = await ADMIN_DAO.updateAdmin(
            {_id: req.admin._id}, {password: await bcrypt.hash(password, 10)}
        );
        if (!success) {
            return res.status(httpStatus.BAD_REQUEST).json({message: 'Password not changed'});
        }
        res.status(httpStatus.OK).json({message: 'Password reset successfully'});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const forgotPassword = async (req, res) => {
    try {
        const {success,  data} = await ADMIN_DAO.getAdmin({email: req.body.email});
        if (!success) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'Email not found'});
        }
        const token = jwt.sign({_id: data._id}, JWT_SECRET, {expiresIn: '1h'}, null);
        const link = `https://trafficoffense.vercel.app/auth/reset-password/${token}`;
        const subject = `Traffic Offense: reset your password`
        const text = `Hello ${data.first_name},
        We've received a request to reset the password for the Traffic Offense account associated with ${data.email}. 
        No changes have been made to your account yet.
        You can reset your password by clicking the link below:
        ${link}
        If you did not request a new password, please let us know immediately by replying to this email.
        - The Traffic Offense team
        `;
        const {success: sent,} = await EMAIL.sendEmail(data.email, subject, text);
        if(!sent) return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Email not sent'
        });
        res.status(httpStatus.OK).json({ message: 'Email sent'});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {register, login, getProfile, updatePassword, updateProfile, resetPassword, forgotPassword};