const express = require("express");
const asyncHandler = require("express-async-handler");

const Katana = require("../models/katana");
const Category = require("../models/category");

exports.katana_list = asyncHandler(async (req, res, next) => {
  const allKatana = await Katana.find()
    .populate("category")
    .sort({ category: -1 })
    .exec();

  res.render("index", { katanas: allKatana });
});

exports.katana_detail = asyncHandler(async (req, res, next) => {
  const katana = await Katana.findById(req.params.id)
    .populate("category")
    .exec();

  if (katana === null) {
    const err = new Error("Katana not found");
    err.status = 404;
    return next(err);
  }

  res.render("katana_detail", { katana: katana });
});

exports.katana_new = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  console.log(categories);

  res.render("katana_new", { categories: categories });
});
