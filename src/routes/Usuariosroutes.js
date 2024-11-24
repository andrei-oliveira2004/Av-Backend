const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/UsuarioController");

router.post("/usuarios", usuarioController.criarUsuario);
router.get("/usuarios", usuarioController.listarUsuarios);
router.put("/usuarios/:id", usuarioController.atualizarUsuario);
router.delete("/usuarios/:id", usuarioController.deletarUsuario);

module.exports = router;
