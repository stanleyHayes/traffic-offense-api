import {Router} from "express";

import {
    registerDriver,
    getDrivers,
    updateDriver,
    deleteDriver,
    getDriver, searchDrivers
} from "./../../controllers/v1/drivers/drivers.controller.js";
import {authenticate} from "../../middleware/v1/authenticate.js";

const router = Router({mergeParams: true});

router.get('/search', authenticate, searchDrivers);
router.route("/").post(authenticate, registerDriver).get(authenticate, getDrivers);
router.route("/:id").get(authenticate, getDriver).put(authenticate, updateDriver).delete(authenticate, deleteDriver);

export default router;
