const Router = require("express");
const userController = require("../controllers/user.controller.js");

const router = Router();

router.get("/users", userController.getUsers);
router.post("/user", userController.createUser);

module.exports = router;
