import {Router} from "express";

import {
    registerAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    getAdmin, inviteAdmin
} from "./../../controllers/v1/admins/admins.controller.js";

const router = Router({mergeParams: true});

router.route("/").post(registerAdmin).get(getAdmins);
router.route("/:id").get(getAdmin).put(updateAdmin).delete(deleteAdmin);
router.post("/invite", inviteAdmin);

export default router;
