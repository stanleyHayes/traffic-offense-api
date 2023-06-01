import {Router} from "express";

import {
    registerVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
    getVehicle
} from "./../../controllers/v1/vehicles/vehicles.controller.js";
import {authenticate} from "../../middleware/v1/authenticate.js";

const router = Router({mergeParams: true});

router.route("/").post(authenticate, registerVehicle).get(authenticate, getVehicles);
router.route("/:id").get(authenticate, getVehicle).put(authenticate, updateVehicle).delete(authenticate, deleteVehicle);

export default router;