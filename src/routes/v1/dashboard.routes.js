import {Router} from "express";

import {getDashboard} from "./../../controllers/v1/dashboard/dashboard.controller.js";
import {authenticate} from "../../middleware/v1/authenticate.js";

const router = Router({mergeParams: true});

router.route("/").get(authenticate, getDashboard);

export default router;
