import Sequelize from "sequelize";

import configDatabase from "../config/database";

import Users from "../app/models/Users";
import Files from "../app/models/Files";

const models = [Users, Files];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(configDatabase);
    models
      .map(model => model.init(this.conection))
      .map(model => model.associate && model.associate(this.conection.models));
  }
}

export default new Database();
