const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  dataConclusao: {
    type: Date,
    required: true
  }
});

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

module.exports = Tarefa;
