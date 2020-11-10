import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

import moment from "moment";

export default function Profile() {
  const [operations, setOperations] = useState([]);

  const history = useHistory();

  const clienteId = localStorage.getItem("clienteId");
  const clienteName = localStorage.getItem("clienteName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: clienteId,
        },
      })
      .then((response) => {
        setOperations(response.data);
      });
  }, [clienteId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`operations/${id}`, {
        headers: {
          Authorization: clienteId,
        },
      });

      setOperations(operations.filter((operation) => operation.id !== id));
    } catch (err) {
      alert("Erro ao deletar operação, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Lorem ipsum" />
        <span>Bem vindo, {clienteName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar nova operação
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Operações cadastradas</h1>

      <ul>
        {operations.map(function (operation) {
          const date1 = new Date(operation.data_expiracao);
          const date2 = new Date(operation.data_contrato);

          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const diffMonths = Math.ceil(diffDays / 30);
          //-==-=-=
          const today = new Date();
          var monthsLate;
          if (date1 < today) {
            const diffTime = Math.abs(today - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            monthsLate = Math.ceil(diffDays / 30);
          }

          return (
            <li key={operation.id}>
              <strong>Valor:</strong>
              <p>
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(operation.valor_contratado)}
              </p>

              <strong>Taxa:</strong>
              <p>{operation.taxa_contratada}%</p>

              <strong>Data da operação:</strong>
              <p>
                {operation.data_contrato
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </p>

              <strong>Data de expiração:</strong>
              <p>{operation.data_expiracao.split("-").reverse().join("/")}</p>

              <strong>Tipo:</strong>
              <p style={{ textTransform: "capitalize" }}>{operation.tipo}</p>

              <strong>Quantidade de parcelas:</strong>
              <p>{diffMonths}</p>

              <strong>Valor de cada parcela: </strong>
              <p>
                {(operation.valor_contratado +
                  (operation.valor_contratado * operation.taxa_contratada) /
                    100) /
                  diffMonths}
              </p>
              {date1 < new Date() ? (
                <>
                  <strong>Atrasado em:</strong> <p>{monthsLate} meses</p>
                  <strong>Multas prevista:</strong>
                  {operation.tipo == "titulo" ? (
                    <p>
                      {operation.valor_contratado * 0.3 + monthsLate * 60 * 0.1}
                    </p>
                  ) : (
                    <p>
                      {operation.valor_contratado * 0.3 +
                        monthsLate * 60 * 0.1 +
                        16.95}
                    </p>
                  )}
                </>
              ) : (
                ""
              )}

              <button
                onClick={() => handleDeleteIncident(operation.id)}
                type="button"
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
