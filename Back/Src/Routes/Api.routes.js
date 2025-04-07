const { Router } = require("express");
const router = Router();

const Tasks = require("./Tasks.routes.js")

router.use("/Tasks", Tasks);

module.exports = router;