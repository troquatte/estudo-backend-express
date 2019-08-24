//Configs
import * as Yup from "yup";
import Users from "../models/Users";
//***********/

//Controller User
class UserController {
  //Metodo Store
  async store(req, res) {
    //Tratamento de dados com Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    //Caso os dados forem invalidos
    if (!(await schema.isValid(req.body))) {
      //Retorna Json com dados invalidos
      res.status(400).json({
        error: "Dados invalidos"
      });
    }

    //Busca o usuário antes de criar
    const find = await Users.findOne({ where: { email: req.body.email } });

    //Pergunga se existe ou não
    if (find) {
      //Se existir retorna erro 400 com msg
      return res.status(400).json({ error: "Existe" });
    }

    //Desestruturação de variavel criando o usuário
    const { id, name, email } = await Users.create(req.body);

    //Retorna o usuário criado com os dados
    return res.json({ id, name, email });
  }

  //Metodo Update
  async update(req, res) {
    //Tratamento de dados com Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      )
    });

    //Se os dados estiverem invalidos
    if (!(await schema.isValid(req.body))) {
      //Retorna Json com dados invalidos
      res.status(400).json({
        error: "Dados invalidos"
      });
    }

    //const com dados da requisição body
    const { email, oldPassword } = req.body;
    //Busca User com Id
    const user = await Users.findByPk(req.userId);

    //Alteração de email
    //Verifica se o email do corpo é diferente o email do User buscado
    if (email !== user.email) {
      //Verifica no banco se esse email novo já existe
      const userExist = await Users.findOne({ where: { email } });
      //Caso existir retorna o erro
      if (userExist) {
        //Erro no Json
        return res.status(400).json({
          error: "Email já existe!"
        });
      }
    }

    //Alteração de senha
    //Verifica se a senha é diferente da confirmacão de senha
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // Caso for diferente
      return res.status(401).json({
        error: "Password é diferente!"
      });
    }

    //Passando nos testes, o update é gerado
    const { id, name, provider } = await user.update(req.body);

    //E json mostrado em tela
    return res.json({
      id,
      name,
      email,
      provider
    });
  }
}

//Exporta UserController
module.exports = new UserController();
