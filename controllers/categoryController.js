const express = require("express");
const Category = require("../models/category");

exports.categoryList = async (req, res, next) => {
  try {
    res.render("category");
    const categories = await Category.find().exec();
  } catch (error) {
    console.log(error);
  }
};
