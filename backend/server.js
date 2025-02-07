const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const sequelize = require('./database'); // Importa a instância do Sequelize

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

app.get('/api/pedido/:cpf_cnpj', async (req, res) => {
  try {
    const cpf_cnpj = req.params.cpf_cnpj.trim(); // Remove espaços em branco

    const result = await sequelize.query(
      `SELECT ns.chavenfe,
        ns.marketplace_pedido ,
        ns.data_emissao,
        ns.transportadora_ecommerce,
        ns.id_nr_nf,
        p.descricao_fiscal ,
		    p.imagem1 
          FROM nota_saida ns
          JOIN cliente c ON c.id_cliente = ns.id_cliente
          join nota_saida_itens nsi on ns.id_nota_saida = nsi.id_nota_saida   
          join produto p on p.id_produto  = nsi.id_produto 
          WHERE c.cpf = :cpf_cnpj
          AND ns.chavenfe <> ''
          AND ns.marketplace_pedido not like '%DEVOL%'`, // Usando = para comparação exata
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { cpf_cnpj: cpf_cnpj } // Passando o valor diretamente
      }
    );

    console.log('Resultado da query:', result);

    if (result.length > 0) {
      res.json({ pedidos: result });
    } else {
      res.status(404).json({ message: 'Chave não encontrado para este CPF/CNPJ' });
    }
  } catch (err) {
    console.error('Erro ao executar a query:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
