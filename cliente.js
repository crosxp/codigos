const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'backend'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/api/cliente', (req, res) => {
    const sql = 'SELECT * FROM cliente';
    connection.query(sql, (err, results)=> {
        if (err) {
            console.error('Erro ao buscar registros: '+ err.message);
            res.status(500).json({ error: 'Erro ao buscar registros'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/api/cliente', (req, res) => {
    const { id ,nome ,cpf ,email, senha} = req.body;


    const sql = 'INSERT INTO cliente (nome ,cpf, email, idade) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nome, cpf, email, senha], (err, result) => {
        if (err) {
            console.error('ERRO ao inserir registro: '+ err.message);
            res.status(500).json({ error: 'ERRO ao inserir registro'});
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso'});
        }
    })
})

app.put('/api/cliente/:id', (req, res) => {
    const { id } = req.params;
    const { nome ,cpf ,email, idade } = req.body;

    const sql = 'UPDATE usuario SET  nome = ?, cpf = ?, email = ?, idade = ? WHERE id = ?';
    connection.query(sql, [ nome ,cpf ,email, senha, id], (err, result) => {
        if (err) {
            console.error('ERRO ao atualizar registro: '+ err.message);
            res.status(500).json({ error: 'ERRO ao atualizar registro'});
        } else {
            console.log('Registro atualizado com sucesso!' );
            res.status(200).json({ message: 'Registro atualizado com sucesso'});
        }
    });
});

app.delete('/api/cliente/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM cliente WHERE id = ?';
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);

app.get('/api/cliente/:email', (req, res)=>{
    const {email} = req.params;
    const sql = 'SELECT * FROM cliente where email = ?';
    connection.query(sql, [email], (err, results)=> {
        if (err) {
            console.error('Erro ao buscar registros: '+ err.message);
            res.status(500).json({ error: 'Erro ao buscar registros'});
        } else {
      
                res.status(200).json(results);
            
           
        }
    
   
    });
    
  })
  
});