const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const operations = await connection("operations").select("*");

    return res.json({ operations });
  },

  async create(req, res) {
    const {
      taxa_contratada,
      valor_contratado,
      data_contrato,
      data_expiracao,
      tipo,
    } = req.body;
    const cliente_id = req.headers.authorization;

    const [id] = await connection("operations").insert({
      taxa_contratada,
      valor_contratado,
      data_contrato,
      cliente_id,
      data_expiracao,
      tipo,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    console.log("entro no delete");
    const { id } = req.params;
    const cliente_id = req.headers.authorization;

    const operation = await connection("operations")
      .where("id", id)
      .select("cliente_id")
      .first();

    if (operation.cliente_id !== cliente_id) {
      return res.status(401).json({ error: "Operation not permited" });
    }

    await connection("operations").where("id", id).delete();

    return res.status(204).send();
  },
};
