const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/tarefasRoutes');  
const userRoutes = require('./routes/Usuariosroutes');  

const app = express();

app.use(express.json());  

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/', {
})
  .then(() => {
    console.log('Conexão bem-sucedida ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);  
  });


app.use('/api', routes);


app.use('/api', userRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
