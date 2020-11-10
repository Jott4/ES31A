const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const cliente_id = req.headers.authorization;

    const operations = await connection("operations")
      .where("cliente_id", cliente_id)
      .select("*");

    return res.json(operations);
  },
};
