const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler")

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ["http://localhost:8000", "https://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
}
app.use(cors(options))

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola soy una nueva ruta")
})



routerApi(app);

app.use(boomErrorHandler)
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
})
