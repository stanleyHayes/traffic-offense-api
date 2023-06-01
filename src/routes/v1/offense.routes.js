import {Router} from "express";

import {
    registerOffense,
    getOffenses,
    updateOffense,
    deleteOffense,
    getOffense
} from "./../../controllers/v1/offenses/offenses.controller.js";
import {authenticate} from "../../middleware/v1/authenticate.js";

const router = Router({mergeParams: true});

router.route("/").post(authenticate, registerOffense).get(authenticate, getOffenses);
router.route("/:id").get(authenticate, getOffense).put(authenticate, updateOffense).delete(authenticate, deleteOffense);

export default router;
