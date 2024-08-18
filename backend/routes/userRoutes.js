import { Router } from "express";
import  {changeCurrentPassword, getCurrentUser, logoutUser, refreshAccessToken, registerUser, updateAvatar, updateCurrentUser } from "../controllers/user.controller.js"
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
router.route("/logout").post( verifyJWT , logoutUser )
router.route("/refresh-token").post( refreshAccessToken )
router.route("/change-password").post( verifyJWT , changeCurrentPassword )
router.route("/get-current-user").get( verifyJWT , getCurrentUser )
router.route("/update-user-details").patch( verifyJWT,updateCurrentUser )
router.route("/update-avatar").patch( verifyJWT , upload.single("avatar") , updateAvatar )

export default router