const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/TarefaController");

router.post("/tarefas", tarefaController.criarTarefa);
router.get("/tarefas", tarefaController.listarTarefas);
router.put("/tarefas/:id", tarefaController.atualizarTarefa);
router.delete("/tarefas/:id", tarefaController.deletarTarefa);

module.exports = router;
