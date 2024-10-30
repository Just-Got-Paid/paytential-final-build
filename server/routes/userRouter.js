const express = require("express");
const userRouter = express.Router();
const userControllers = require("../controllers/userControllers");
const checkAuthentication = require("../middleware/checkAuthentication");

// From Template, just converted to using router
userRouter.post("/", userControllers.createUser);
userRouter.get("/", checkAuthentication, userControllers.listUsers);
userRouter.get("/:id", checkAuthentication, userControllers.showUser);
userRouter.patch("/:id", checkAuthentication, userControllers.updateUser);

// delete single user by ID
userRouter.delete("/:id", checkAuthentication, userControllers.deleteUser);
// delete all users (don't need?)
userRouter.delete("/", userControllers.deleteAllUsers);

module.exports = userRouter;
