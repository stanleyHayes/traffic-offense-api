import {Router} from "express";

import {
    registerAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    getAdmin, inviteAdmin
} from "./../../controllers/v1/admins/admins.controller.js";
import {authenticate} from "../../middleware/v1/authenticate.js";

const router = Router({mergeParams: true});

router.route("/").post(authenticate, registerAdmin).get(authenticate, getAdmins);
router.route("/:id").get(authenticate, getAdmin).put(authenticate, updateAdmin).delete(authenticate, deleteAdmin);
router.post("/invite", authenticate, inviteAdmin);

export default router;