import httpStatus from "http-status";
const registerDriver = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Driver registered successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getDriver = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Driver retrieved successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getDrivers = async (req, res) => {
    try {
        res.status(httpStatus.OK).json({data: null, message: "Drivers retrieved successfully"});
    }catch (e) {

    }
}


const updateDriver = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Driver updated successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteDriver = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Driver deleted successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerDriver, getDriver, deleteDriver, updateDriver, getDrivers};