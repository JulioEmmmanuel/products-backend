const express = require("express");
const ProductsService = require("../services/products.service");

const validatorHandler = require("../middlewares/validator.handler")
const {createProductSchema, updateProductSchema, getProductSchema} = require("../schemas/product.schema")

const router = express.Router();
const service = new ProductsService();


router.get("/", async (req, res) => {
  const products = await service.find();
  res.status(200).json(products)
});

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    if(!product){
      return res.status(404).json({
        message: "Not found"
      })
    }
    res.status(200).json(product)
  } catch(error){
    next(error);
  }
})

router.post("/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
})

router.patch("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {

  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch(error){
    next(error);
  }

})

router.delete("/:id",
validatorHandler(getProductSchema, "params"),
async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await service.delete(id);
    res.json(result);
  } catch(error){
    next(error)
  }
})

module.exports = router;
