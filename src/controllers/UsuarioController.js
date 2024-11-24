const Usuario = require("../models/Usuario");

const criarUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};


const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter usuários", error });
  }
};


const atualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};


const deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
};

module.exports = { criarUsuario, obterUsuarios, atualizarUsuario, deletarUsuario };
