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

const router = Router({mergeParams: true});

router.post("/register", register);
router.post("/login", login);
router.put("/profile", updateProfile);
router.get("/profile", getProfile);
router.put("/password", updatePassword);
router.post("/password/reset", resetPassword);
router.post("/password/forgot", forgotPassword);

export default router;
