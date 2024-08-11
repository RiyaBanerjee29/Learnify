import { Router } from "express";
import  {logoutUser, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multerMiddleware.js";
import { LoginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/authorizationMiddleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
           name : "avatar",
           maxCount : 1
        }
    ]),
    registerUser
)
router.route("/login").post(LoginUser)

//Protected Routes
router.route("/logout").post(verifyJWT , logoutUser)

export default router