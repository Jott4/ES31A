const express = require("express");

const clienteController = require("./controllers/clienteController");
const operationsController = require("./controllers/operationsController");
const profileController = require("./controllers/profileController");
const sessionController = require("./controllers/sessionController");

// const connection = require("./database/connection");
const routes = express.Router();

routes.post("/sessions", sessionController.create);

routes.get("/cliente", clienteController.index);
routes.post("/cliente", clienteController.create);

routes.get("/operations", operationsController.index);
routes.post("/operations", operationsController.create);
routes.delete("/operations/:id", operationsController.delete);

routes.get("/profile", profileController.index);

module.exports = routes;
