const joi = require("joi");

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const sex = joi.string().min(4).max(8);

const createUserSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  sex: sex.required()
})

const getUserSchema = joi.object({
  id: id.required()
})

const updateUserSchema = joi.object({
  name: name,
  lastName: lastName,
  sex: sex
})

module.exports = {createUserSchema, getUserSchema, updateUserSchema}
