const express= require("express")
const router = express.Router();
const userController = require("../controller/user.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/profile", authenticate, userController.getUserProfile);
router.get("/", userController.getAllUsers);

module.exports=router;