const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "O título é obrigatório"],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, "A descrição é obrigatória"],
    trim: true
  },
  status: {
    type: String,
    enum: ["Pendente", "Em andamento", "Concluída"],
    default: "Pendente",
    required: true
  }
});

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

module.exports = Tarefa;