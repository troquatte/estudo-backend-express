//Configs
import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controller/UserController";
import SessionController from "./app/controller/SessionController";
import FileController from "./app/controller/FileController";
import authMiddleware from "./app/middleware/auth";

const routes = new Router();
const upload = multer(multerConfig);
/****************/

//Rotas acessadas sem precisar logar

//Criação de User
routes.post("/", UserController.store);
//Verifica a Sessão criando Token do user
routes.post("/sessions", SessionController.store);

//Middleware Auth
routes.use(authMiddleware);

//Para logar nas rotas a baixo
//É preciso estar Logados

//Update do User
routes.put("/update", UserController.update);

//Upload de Files com Multer ( Thumbnail )
routes.post("/files", upload.single("file"), FileController.store);

module.exports = routes;
