const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tarefaRoutes = require('./routes/tarefasroutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/tarefasDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    });

// Rotas
app.use('/api', tarefaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});