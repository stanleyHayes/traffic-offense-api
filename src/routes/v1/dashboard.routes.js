import {Router} from "express";

import {getDashboard} from "./../../controllers/v1/dashboard/dashboard.controller.js";

const router = Router({mergeParams: true});

router.route("/").get(getDashboard);

export default router;
