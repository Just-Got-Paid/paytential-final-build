const express = require("express");
const authRouter = express.Router();
const authControllers = require("../controllers/authControllers");

// From Template, just converted to using router
authRouter.get("/me", authControllers.showMe);
authRouter.post("/login", authControllers.loginUser);
authRouter.delete("/logout", authControllers.logoutUser);

module.exports = authRouter;
