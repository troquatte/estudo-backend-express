//Configs
import express from "express";
import routes from "./router";

import "./database";
/**********/

class App {
  //Construtor
  constructor() {
    //Iniciar o server Express
    this.server = express();
    //Chama os Middleware
    this.middleware();
    //Busca as Rotas
    this.router();
  }

  middleware() {
    //Middleware Json
    this.server.use(express.json());
  }

  router() {
    //Rotas
    this.server.use(routes);
  }
}

module.exports = new App().server;
