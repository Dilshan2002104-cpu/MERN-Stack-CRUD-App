const express = require("express");
const router = express.Router();

const userController = require("../Controlers/UserControllers"); // Correct path

router.get("/", userController.getAllUsers);
router.post("/", userController.addUsers);
router.get("/:id",userController.getById);
router.put("/:id",userController.updateUser);

module.exports = router;
