//Import Sequelize model e bcrypt
import Sequelize, { Model, VIRTUAL } from "sequelize";
import bcrypt from "bcryptjs";

//Model User
class Users extends Model {
  // Objeto Init com dados do sequelize
  static init(sequelize) {
    //Super init do sequelize para iniciar o model
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    //Hooks: BeforeSave cria o bcrypt
    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: "avatar_id" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Users;
