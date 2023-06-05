import httpStatus from "http-status";
import {ADMIN_DAO} from "../../../dao/v1/admins/admins.dao.js";

const registerAdmin = async (req, res) => {
    try {
        const {first_name, last_name, email, username, permissions, password} = req.body;
        if (!first_name || !last_name || !email || !username || !password) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }
        const {code, data, message, success} = await ADMIN_DAO.createAdmin({
            first_name,
            last_name,
            email,
            permissions,
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

const getAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const {success, code, data, message} = await ADMIN_DAO.getAdmin({_id: id});
        if (!success) {
            return res.status(code).json({data, message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getAdmins = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || {created_at: -1};
        const match = {};
        if (req.query.status) {
            match['status'] = req.query.status;
        }
        const options = {sort, limit, skip};
        const {code, data, message, count} = await ADMIN_DAO.getAdmins(match, options);
        res.status(code).json({data, message, count});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


const searchAdmins = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const {query} = req.query;
        const {data: admins} = await ADMIN_DAO.getAdmins({});
        const results = admins.filter(admin => {
            return admin.first_name.toLowerCase().includes(query.toLowerCase()) ||
                admin.last_name.toLowerCase().includes(query.toLowerCase()) ||
                admin.email.toLowerCase().includes(query.toLowerCase()) ||
                admin.username.toLowerCase().includes(query.toLowerCase()) ||
                admin.phone.toLowerCase().includes(query.toLowerCase());
        });
        const paginatedResult = results.slice(skip, skip + limit);
        res.status(httpStatus.OK).json({message: 'Admins retrieved successfully', data: paginatedResult});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


const updateAdmin = async (req, res) => {
    try {

        delete req.body['updated_at'];
        delete req.body['created_at'];
        delete req.body['_id'];
        delete req.body['__v'];

        const {id} = req.params;
        const {success, code, data, message} = await ADMIN_DAO.updateAdmin(
            {_id: id}, req.body);
        if (!success) {
            return res.status(code).json({message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteAdmin = async (req, res) => {
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

const inviteAdmin = async (req, res) => {
    try {
        const {first_name, last_name, email, license_id, address} = req.body;
        if (!first_name || !last_name || !email || !license_id || !address) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Missing required fields"});
        }
        const {code, data, message, success} = await ADMIN_DAO.createAdmin({
            first_name,
            last_name,
            email,
            license_id,
            address
        });
        if (!success) {
            return res.status(code).json({message});
        }
        res.status(code).json({data, message});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerAdmin, getAdmin, deleteAdmin, updateAdmin, getAdmins, inviteAdmin, searchAdmins};