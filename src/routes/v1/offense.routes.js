import {Router} from "express";

import {
    registerOffense,
    getOffenses,
    updateOffense,
    deleteOffense,
    getOffense
} from "./../../controllers/v1/offenses/offenses.controller.js";

const router = Router({mergeParams: true});

router.route("/").post(registerOffense).get(getOffenses);
router.route("/:id").get(getOffense).put(updateOffense).delete(deleteOffense);

export default router;
