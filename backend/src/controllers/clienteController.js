const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    const empresas = await connection("cliente").select("*");
    return res.json(empresas);
  },

  async create(req, res) {
    const {
      nome,
      razao_social,
      endereco,
      cidade,
      uf,
      telefone,
      nomeGerente,
      foneGerente,
      faturamento,
      tipo,
    } = req.body;

    const id = crypto.randomBytes(4).toString("hex");

    await connection("cliente").insert({
      id,
      nome,
      razao_social,
      endereco,
      cidade,
      uf,
      telefone,
      nomeGerente,
      foneGerente,
      faturamento,
      tipo,
    });

    return res.json({ id });
  },
};
