

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


// to see they are object or function
// console.log("authMiddleware:", typeof authMiddleware);
// console.log("getUsers:", typeof userController.getUsers);

router.get("/users", authMiddleware, userController.getUsers);
router.post("/users", authMiddleware, userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

module.exports = router;