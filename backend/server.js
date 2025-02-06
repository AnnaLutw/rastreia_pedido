const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('./database');  // Aqui você deve importar sua instância Sequelize

const app = express();  // Inicializando o servidor Express
const port = 3000;  // Defina a porta para o servidor

app.get('/api/pedido/:cpf_cnpj', async (req, res) => {
    try {
      const cpf_cnpj = req.params.cpf_cnpj.trim(); // Remove espaços em branco
  
      const result = await sequelize.query(
        `SELECT DISTINCT(ns.marketplace_pedido) 
         FROM nota_saida ns
         JOIN cliente c ON c.id_cliente = ns.id_cliente
         WHERE c.cpf = :cpf_cnpj`, // Usando = para comparação exata
        {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { cpf_cnpj: cpf_cnpj } // Passando o valor diretamente
        }
      );
  
      console.log('Resultado da query:', result);
  
      if (result.length > 0) {
        res.json({ marketplace_pedido: result[0].marketplace_pedido });
      } else {
        res.status(404).json({ message: 'Pedido não encontrado para este CPF/CNPJ' });
      }
    } catch (err) {
      console.error('Erro ao executar a query:', err);
      res.status(500).json({ error: err.message });
    }
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
