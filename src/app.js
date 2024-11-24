
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.use(express.json());


mongoose.connect('mongodb://localhost:27017/', {
})
  .then(() => {
    console.log('Conexão bem-sucedida ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); 
  });


app.get('/', (req, res) => {
  res.send('API Backend com Express e MongoDB');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
