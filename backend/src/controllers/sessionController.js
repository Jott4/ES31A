const connection = require("../database/connection");
const { create } = require("./clienteController");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connection("cliente")
      .where("id", id)
      .select("nome")
      .first();

    if (!ong) {
      return res.status(400).json({ error: "No Cliente Found with this ID" });
    }
    return res.json(ong);
  },
};
