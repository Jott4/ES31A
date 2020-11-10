import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [taxa, setTaxa] = useState();
  const [valor, setValor] = useState();
  const [expriration, setExpiration] = useState();
  const [type, setType] = useState("titulo");

  const history = useHistory();

  const clienteId = localStorage.getItem("clienteId");

  const [typeEmp, setTypeEmp] = useState();
  const [faturamento, setFaturamento] = useState();
  async function getClientes() {
    const res = await api.get("cliente");

    res.data.map((item) => {
      console.log(item.id);
      console.log("CCid", clienteId);
      if (item.id == clienteId) {
        console.log(item.faturamento);
        console.log(item.tipo);
        setFaturamento(item.faturamento);
        setTypeEmp(item.tipo);
      }
    });
  }
  getClientes();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      taxa_contratada: taxa,
      valor_contratado: valor,
      data_contrato: new Date(),
      data_expiracao: expriration,
      tipo: type,
    };

    try {
      await api.post("operations", data, {
        headers: {
          Authorization: clienteId,
        },
      });

      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar operação, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <p>Seu empresa é uma {typeEmp}</p>
          <p>Seu faturamento é de {faturamento} R$</p>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar nova Operação</h1>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <p className="back-link" style={{ marginTop: 0 }}>
            Taxa acordada
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="number"
              min="1"
              placeholder="Taxa acordada"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
            />

            <h1 style={{ padding: "20px" }}>%</h1>
          </div>
          <p className="back-link" style={{ marginTop: 10 }}>
            Valor
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="number"
              max={faturamento * 0.25 > 10000 ? faturamento * 0.25 : 10000}
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <h1 style={{ padding: "14px" }}>R$</h1>
          </div>
          <p>
            Limite máximo:{" "}
            {faturamento * 0.25 > 10000 ? faturamento * 0.25 : 10000} R$
          </p>
          <p className="back-link" style={{ marginTop: 10 }}>
            Data de expiração
          </p>
          <input
            style={{ maxWidth: "86%" }}
            type="date"
            value={expriration}
            onChange={(e) => setExpiration(e.target.value)}
          />
          <p className="back-link" style={{ marginTop: 10 }}>
            Tipo
          </p>
          <select
            style={{ marginTop: "8px", maxWidth: "86%" }}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="titulo">Título</option>
            <option value="cheque">Cheque</option>
          </select>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
