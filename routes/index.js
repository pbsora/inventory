var express = require("express");
var router = express.Router();

const katana_controller = require("../controllers/katanaController");
const category_controller = require("../controllers/categoryController");
/* GET home page. */
router.get("/", katana_controller.katana_list);

router.get("/category", category_controller.categoryList);

router.get("/:id", katana_controller.katana_detail);

router.get("/category/:name", category_controller.categoryList);

module.exports = router;
