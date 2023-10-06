const express = require("express");
const router = express.Router();

const katana_controller = require("../controllers/katanaController");

router.get("/new", katana_controller.katana_new_get);

router.post("/new", katana_controller.katana_new_post);

router.get("/:id", katana_controller.katana_detail);

router.post("/:id/delete", katana_controller.katana_delete_post);

module.exports = router;
