const express = require("express");
const productsRouter = require("./products.router");
const categoriesRouter = require("./categories.router");
const usersRouter = require("./users.router");

function routerApi(app){
  const appRouter = express.Router();

  appRouter.use("/products", productsRouter);
  appRouter.use("/categories", categoriesRouter);
  appRouter.use("/users", usersRouter);

  app.use("/api/v1", appRouter);
}

module.exports = routerApi;
