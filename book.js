const express = require('express');
const mysql = require('mysql');
const app = express ();
const port = 3000;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

const connection = mysql.createConnection({
   host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'backend'

});

connection.connect((err)=> {
    if (err) {
        console.error('Erro ao conectar ao MySQL: '+ err.message);
    }else{
        console.log('Conectado ao MySQL');
    }
});
   
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (err, results)=> {
        if (err) {
            console.error('Erro ao buscar registros: '+ err.message);
            res.status(500).json({ error: 'Erro ao buscar registros'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/api/usuarios', (req, res) => {
    const { email, senha} = req.body;


    const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
    connection.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error('ERRO ao inserir registro: '+ err.message);
            res.status(500).json({ error: 'ERRO ao inserir registro'});
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso'});
        }
    })
})

app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    const sql = 'UPDATE usuario SET email = ?, senha = ? WHERE id = ?';
    connection.query(sql, [email, senha, id], (err, result) => {
        if (err) {
            console.error('ERRO ao atualizar registro: '+ err.message);
            res.status(500).json({ error: 'ERRO ao atualizar registro'});
        } else {
            console.log('Registro atualizado com sucesso!' );
            res.status(200).json({ message: 'Registro atualizado com sucesso'});
        }
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuario WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('ERRO ao excluir registro: '+ err.message);
            res.status(500).json({ error: 'ERRO  ao excluir registro'});
        } else {
            if (result.affectedRows > 0) {
                console.log('Registro exluido com sucesso!');
                res.status(200).json({ message: 'Registro excluido com sucesso'});
            } else {
                console.log('Registro não encontrado.');
                res.status(404).json ({ message: 'Registro não encontrado'});
            }
        }
    });
});














// simulando um "banco de dados"

/*let books = [
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

app.get('/', (req, res) => {
    res.send('Olá, mundo! Esta é a resposta do método GET.');
});

app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const nemTitle = req.body.title; 

    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = nemTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send('Livro não encontrado');
    }
    
} );

app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id)

    const indexToRemove = books.findIndex(book => book.id === bookId);

    if (indexToRemove !== -1) {
        const removedBook = books.splice(indexToRemove, 1);
        res.json(removedBook[0]);
    } else {
      res.status(404).send('Livro não encontrado');
    }
});*/


app.listen(port, () => {
console.log( 'servidor rodando em http://localhost:${port}');

});
