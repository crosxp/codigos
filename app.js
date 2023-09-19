// Importando o Módulo do Express
const express = require('express');
 
// Criando um objeto do Express
const app = express();
 
// resgatando os dados da requisição
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})

app.get('/cliente', (req, res) => {
    res.send('Cliente :Alyson Lincon '
        + 'Freitas de Lima')
    res.end()
})
 
app.get('/usuario', (req, res) => {
    res.send('Usuario: Guilherme Almeida '
        + 'Mendes da Silva')
    res.end()
})

app.get('/Crush', (req, res) => {
    res.send('Crush: Nicole Augusta'
        + 'Rodrigues da Silva')
    res.end()
})

app.get('/usuario', (req, res) => {
    res.send('Usuario: Guilherme Almeida '
        + 'Mendes da Silva')
    res.end()
})

app.get('/GrandeAmigo', (req, res) => {
    res.send('GrandeAmigo: Pedro Fernando '
        + 'Nunes Pimentel')
    res.end()
})





// Numero da Porta
const PORT = process.env.PORT ||5001;
 
// Executar o Servicor Node
app.listen(PORT,console.log(
  `Server started on port ${PORT}`))