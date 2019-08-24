//Configs
import Files from "../models/Files";
//********/

//Upload de Arquivo salvando dados no banco
class FileController {
  //Metodo Store
  async store(req, res) {
    //Req do form
    const { originalname: name, filename: path } = req.file;

    //Criando o status no banco
    const file = await Files.create({
      name,
      path
    });

    //Retornando o Json
    return res.json(file);
  }
}

export default new FileController();
