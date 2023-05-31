import {Router} from "express";

import {
    registerVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
    getVehicle
} from "./../../controllers/v1/vehicles/vehicles.controller.js";

const router = Router({mergeParams: true});

router.route("/").post(registerVehicle).get(getVehicles);
router.route("/:id").get(getVehicle).put(updateVehicle).delete(deleteVehicle);

export default router;