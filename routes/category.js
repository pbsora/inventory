var express = require("express");
var router = express.Router();

const category_Controller = require("../controllers/categoryController.js");

/* GET users listing. */
router.get("/", category_Controller.categoryList);

module.exports = router;
