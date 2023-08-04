const express = require("express");

const { validateBody, authorization } = require("../../middlewares");
const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/register", validateBody(schemas.validateSchema), ctrl.register);

router.post("/login", validateBody(schemas.validateSchema), ctrl.login);

router.get("/current", authorization, ctrl.getCurrent);

router.post("/logout", authorization, ctrl.logout);

router.patch(
  "/",
  authorization,
  validateBody(schemas.validateSubscription),
  ctrl.updateSubscription
);

module.exports = router;
