const express = require("express");
const router = express.Router();

const katana_controller = require("../controllers/katanaController");
const katana = require("../models/katana");

router.get("/new", katana_controller.katana_new_get);

router.post("/new", katana_controller.katana_new_post);

router.get("/:id", katana_controller.katana_detail);

router.get("/:id/delete", katana_controller.katana_delete_get);

router.post("/:id/delete", katana_controller.katana_delete_post);

router.get("/:id/edit", katana_controller.katana_update_get);

router.post("/:id/edit", katana_controller.katana_update_post);

module.exports = router;
