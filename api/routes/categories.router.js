const express = require("express");
const CategoriesService = require("../services/categories.service");
const {getUserSchema, createUserSchema, updateUserSchema} = require("../schemas/category.schema");
const validatorHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new CategoriesService();

router.get("/",
async (req, res) => {
  const categories = await service.find()
  res.json(categories);
})

router.get("/:id",
validatorHandler(getUserSchema, "params"),
async (req, res) => {
  const {id} = req.params;
  const category = await service.findOne(id);
  return res.status(200).json(category);
})

router.post("/",
validatorHandler(createUserSchema, "body"),
async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
})

router.patch("/:id",
validatorHandler(getUserSchema, "params"),
validatorHandler(updateUserSchema, "body"),
async (req, res) => {

  try {
    const {id} = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch(error){
    res.status(404).json({
      message: error.message
    })
  }

})

router.delete("/:id",
validatorHandler(getUserSchema, "params"),
async (req, res) => {
  const {id} = req.params;
  const result = await service.delete(id);
  res.json(result);
})


module.exports = router;
