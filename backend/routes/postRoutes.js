import { Router } from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyJWT } from "../middleware/authorizationMiddleware.js";
import { addPost, editPost , deletePost } from "../controllers/post.controller.js";

const router = Router()

router.route("/add").post(
    verifyJWT,
    upload.fields([
        {
           name : "image",
           maxCount : 1
        }
    ]),
    addPost
)

router.route("/edit/:postId").patch(verifyJWT , editPost)
router.route("/delete/:postId").delete(verifyJWT , deletePost)
export default router