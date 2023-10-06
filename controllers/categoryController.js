const express = require("express");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const katana = require("../models/katana");

exports.categoryList = asyncHandler(async (req, res, next) => {
  const categories = await Category.findOne({ name: req.params.name }).exec();
  const type = await katana.find({ category: categories });
  res.render("category_item", { katanas: type });
});
