//Configs
import jwt from "jsonwebtoken";

import configAuth from "../../config/auth";
import User from "../models/Users";
//********/

//Sessão de usuário com jwt
class SessionController {
  //Autenticando dados do User
  async store(req, res) {
    //Dados do form Email e Pass
    const { email, password } = req.body;
    //Busca o email do User no banco para verificar se já existe
    const user = await User.findOne({ where: { email } });

    //Se não existir
    if (!user) {
      //Retorna msg Json de error
      return res.status(401).json({ error: "User Not Found" });
    }

    //Se o Password não for correto
    //Metodo .checkPassword() Está no arquivo Models/auth ( bcrypt )
    if (!(await user.checkPassword(password))) {
      //Caso o Password for errado, retorna msg Json de error
      return res.status(401).json({ error: "Password is not check" });
    }

    //Salva dados do Id e Nome do User
    const { id, name } = user;

    //Assim que Loguin tiver ok retorn json com msg e JWT
    return res.status(200).json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, configAuth.secret, {
        expiresIn: configAuth.day
      })
    });
  }
}

export default new SessionController();
