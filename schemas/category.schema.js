const joi = require("joi");

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);

const createUserSchema = joi.object({
  name: name.required(),
})

const getUserSchema = joi.object({
  id: id.required()
})

const updateUserSchema = joi.object({
  name: name
})

module.exports = {createUserSchema, getUserSchema, updateUserSchema}
