const express = require("express");
const multer = require("multer");
const path = require("path");
const Usuario = require("./models/Usuario");
const sequelize = require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Rota para cadastrar usuário
app.post("/api/usuarios", upload.single("imagemCliente"), async (req, res) => {
  try {
    const {
      nome,
      cpf,
      email,
      dataNascimento,
      parentescoNome,
      parentescoNumero,
      remedioContinuo,
      remedioNome,
      remedioDescricao,
      problemasSaude,
      problemasSaudeDescricao,
      alergiaDoenca,
      alergiaDoencaDescricao,
    } = req.body;

    const imagemCliente = req.file ? req.file.filename : null;

    const novoUsuario = await Usuario.create({
      nome,
      cpf,
      email,
      dataNascimento,
      imagemCliente,
      parentescoNome,
      parentescoNumero,
      remedioContinuo: remedioContinuo === "on",
      remedioNome,
      remedioDescricao,
      problemasSaude: problemasSaude === "on",
      problemasSaudeDescricao,
      alergiaDoenca: alergiaDoenca === "on",
      alergiaDoencaDescricao,
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    res.status(500).json({ error: "Erro ao salvar usuário" });
  }
});

// Rota para obter todos os usuários cadastrados
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Rota para excluir um usuário pelo ID
app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.destroy({ where: { id } });
    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

// Servir arquivos estáticosjs
app.use(express.static(path.join(__dirname, "public")));

// Inicializa o servidor
sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados sincronizado");
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
});
