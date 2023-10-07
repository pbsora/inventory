const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.katana_new_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();

  res.render("katana_new", { categories: categories });
});

exports.katana_new_post = [
  body("name", "Name must be specified").trim().escape(),
  body("description").trim().isLength({ min: 5 }).escape(),

  asyncHandler(async (req, res, next) => {
    const category = await Category.findOne({ name: req.body.category }).exec();
    let image = req.body.image;
    if (req.body.image === "") {
      image =
        "https://tozandoshop.com/cdn/shop/products/1_000000005587_840x.jpg?v=1648192654";
    } else {
      image = req.body.image;
    }

    const katana = new Katana({
      name: req.body.name,
      imageUrl: image,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.stock,
      category: category,
    });

    await katana.save();
    res.redirect(katana.url);
  }),
];

exports.katana_delete_get = (req, res) => {
  res.render("katana_delete");
};

exports.katana_delete_post = asyncHandler(async (req, res) => {
  await Katana.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

exports.katana_update_get = asyncHandler(async (req, res) => {
  const [katana, categories] = await Promise.all([
    await Katana.findById(req.params.id).populate("category").exec(),
    await Category.find(),
  ]);
  console.log(katana.inStock);
  res.render("katana_edit", { katana: katana, categories: categories });
});

exports.katana_update_post = [
  body("name", "Name must be specified").trim().escape(),
  body("description").trim().isLength({ min: 5 }).escape(),
  asyncHandler(async (req, res) => {
    const category = await Category.findOne({ name: req.body.category }).exec();
    await Katana.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.stock,
        category: category,
      },
    });
    res.redirect("/katana/" + req.params.id);
  }),
];
