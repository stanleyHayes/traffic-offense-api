import {Router} from "express";

import {
    registerDriver,
    getDrivers,
    updateDriver,
    deleteDriver,
    getDriver
} from "./../../controllers/v1/drivers/drivers.controller.js";

const router = Router({mergeParams: true});

router.route("/").post(registerDriver).get(getDrivers);
router.route("/:id").get(getDriver).put(updateDriver).delete(deleteDriver);

export default router;