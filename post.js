const express = require('express');
const app = express ();
const port = 3000;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// simulando um "banco de dados"

let books = [
    { id: 1, title: 'livro 1'},
    { id: 2, title: 'livro 2'},
    { id: 3, title: 'livro 3'}

];

app.get('/books', (req, res) => {
    res.json(books);
});

// rota para adicionar um novo livro (metodo post)

app.post('/post-example',(req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});



app.listen(port, () => {
console.log( 'servidor rodando em http://localhost:${port}');

});