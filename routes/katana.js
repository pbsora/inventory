const express = require("express");
const router = express.Router();

const katana_controller = require("../controllers/katanaController");

router.get("/new", katana_controller.katana_new);

router.get("/:id", katana_controller.katana_detail);

module.exports = router;
