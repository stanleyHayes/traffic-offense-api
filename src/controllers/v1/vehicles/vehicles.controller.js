import httpStatus from "http-status";
const registerVehicle = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Vehicle registered successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getVehicle = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Vehicle retrieved successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const getVehicles = async (req, res) => {
    try {
        res.status(httpStatus.OK).json({data: null, message: "Vehicles retrieved successfully"});
    }catch (e) {

    }
}


const updateVehicle = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Vehicle updated successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

const deleteVehicle = async (req, res) => {
    try {
        res.status(httpStatus.CREATED).json({data: null, message: "Vehicle deleted successfully"});
    }catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}


export {registerVehicle, getVehicle, deleteVehicle, updateVehicle, getVehicles};