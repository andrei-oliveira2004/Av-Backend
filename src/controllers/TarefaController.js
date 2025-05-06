const Tarefa = require("../models/Tarefa");

const criarTarefa = async (req, res) => {
  try {
    const tarefa = new Tarefa(req.body);
    await tarefa.save();
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar tarefa", error: error.message });
  }
};

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter tarefas", error: error.message });
  }
};

const atualizarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tarefa) return res.status(404).json({ message: "Tarefa não encontrada" });
    res.json(tarefa);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar tarefa", error: error.message });
  }
};

const obterTarefaPorId = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter tarefa", error: error.message });
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if (!tarefa) return res.status(404).json({ message: "Tarefa não encontrada" });
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar tarefa", error: error.message });
  }
};

module.exports = { criarTarefa, listarTarefas, atualizarTarefa, deletarTarefa, obterTarefaPorId };