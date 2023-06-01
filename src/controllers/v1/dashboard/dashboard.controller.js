import httpStatus from "http-status";
import {VEHICLE_DAO} from "../../../dao/v1/vehicles/vehicles.dao.js";
import {OFFENSE_DAO} from "../../../dao/v1/offenses/offenses.dao.js";
import {DRIVER_DAO} from "../../../dao/v1/drivers/drivers.dao.js";
import {ADMIN_DAO} from "../../../dao/v1/admins/admins.dao.js";


const getDashboard = async (req, res) => {
    try {
        const {count: vehicles} = await VEHICLE_DAO.getVehicles({});
        const {count: offenses} = await OFFENSE_DAO.getOffenses({});
        const {count: admins} = await ADMIN_DAO.getAdmins({});
        const {count: drivers} = await DRIVER_DAO.getDrivers({});

        const {data: recent_vehicles} = await VEHICLE_DAO.getVehicles(
            {},
            {
                limit: 10, sort: {created_at: -1}
            });
        const {data: recent_offenses} = await OFFENSE_DAO.getOffenses(
            {},
            {limit: 10, sort: {created_at: -1}}
        );
        const {data: recent_admins} = await ADMIN_DAO.getAdmins(
            {},
            {limit: 10, sort: {created_at: -1}}
        );
        const {data: recent_drivers} = await DRIVER_DAO.getDrivers(
            {},
            {limit: 10, sort: {created_at: -1}}
        );

        const {count: draft_offenses} = await OFFENSE_DAO.getOffenses({status: 'DRAFT'});
        const {count: pending_offenses} = await OFFENSE_DAO.getOffenses({status: 'PENDING'});
        const {count: paid_offenses} = await OFFENSE_DAO.getOffenses({status: 'PAID'});

        const {count: speeding_offenses} = await OFFENSE_DAO.getOffenses({offense_name: 'SPEEDING'});
        const {count: red_light_offenses} = await OFFENSE_DAO.getOffenses({offense_name: 'RED_LIGHT'});

        const data= {
            stat: {
                offenses: {
                    count: offenses,
                    draft: draft_offenses,
                    paid: paid_offenses,
                    pending: pending_offenses,
                    red_light: red_light_offenses,
                    speeding: speeding_offenses
                }, drivers, vehicles, admins
            },
            recent_vehicles, recent_admins, recent_drivers, recent_offenses
        }
        res.status(httpStatus.OK).json({data, message: "Information retrieved successfully"});
    } catch (e) {
        console.log(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
}

export {getDashboard};