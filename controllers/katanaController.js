const express = require("express");
const Katana = require("../models/katana");
const asyncHandler = require("express-async-handler");

exports.katana_list = asyncHandler(async (req, res, next) => {
  const allKatana = await Katana.find();

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
