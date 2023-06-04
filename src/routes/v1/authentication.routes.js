import {Router} from "express";

import {
    resetPassword,
    updateProfile,
    forgotPassword,
    getProfile,
    register,
    updatePassword,
    login
} from "./../../controllers/v1/authentication/authentication.controller.js";
import {authenticate} from "../../middleware/v1/authenticate.js";

const router = Router({mergeParams: true});

router.post("/register", register);
router.post("/login", login);
router.put("/profile", authenticate, updateProfile);
router.get("/profile", authenticate, getProfile);
router.put("/password", authenticate, updatePassword);
router.post("/password/reset/:token", resetPassword);
router.post("/password/forgot", forgotPassword);

export default router;
