var express = require("express");
var router = express.Router();

const katana_controller = require("../controllers/katanaController");

/* GET home page. */
router.get("/", katana_controller.katana_list);

router.get("/:id", katana_controller.katana_detail);

module.exports = router;
