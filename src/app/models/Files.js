//Import Sequelize model e bcrypt
import Sequelize, { Model, VIRTUAL } from "sequelize";

//Model User
class Files extends Model {
  // Objeto Init com dados do sequelize
  static init(sequelize) {
    //Super init do sequelize para iniciar o model
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default Files;
