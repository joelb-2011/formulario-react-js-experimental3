import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  const validarCampo = (nombre, valor) => {
    let error = "";

    if (nombre === "nombre" && valor.trim() === "") {
      error = "El nombre es obligatorio.";
    }

    if (nombre === "correo") {
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexCorreo.test(valor)) {
        error = "El correo no tiene un formato válido.";
      }
    }

    if (nombre === "contraseña") {
      if (valor.length < 8) {
        error = "La contraseña debe tener al menos 8 caracteres.";
      }
    }

    setErrores((prev) => ({ ...prev, [nombre]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validarCampo(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar campos vacíos
    if (!form.nombre || !form.correo || !form.contraseña) {
      setMensaje("Es necesario completar todos los campos.");
      return;
    }

    // Verificar errores
    if (errores.nombre || errores.correo || errores.contraseña) {
      setMensaje("Datos erroneos. Por favor, verifique sus datos antes de enviar.");
      return;
    }

    setMensaje("¡Datos de formulario enviado con éxito!");
    console.log("Datos enviados:", form);
  };

  return (
    <div className="full-container bg-custom">
    <div className="container">
      <h1 className="text-center mb-4">Formulario</h1>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
            value={form.nombre}
            onChange={handleChange}
          />
          {errores.nombre && (
            <div className="invalid-feedback">{errores.nombre}</div>
          )}
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="correo"
            className={`form-control ${errores.correo ? "is-invalid" : ""}`}
            value={form.correo}
            onChange={handleChange}
          />
          {errores.correo && (
            <div className="invalid-feedback">{errores.correo}</div>
          )}
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className={`form-control ${
              errores.contraseña ? "is-invalid" : ""
            }`}
            value={form.contraseña}
            onChange={handleChange}
          />
          {errores.contraseña && (
            <div className="invalid-feedback">{errores.contraseña}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Enviar
        </button>

        {/* Mensaje dinámico */}
        {mensaje && (
          <div
            className={`alert mt-3 ${
              mensaje.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {mensaje}
          </div>
        )}
      </form>
    </div>
    </div>
  );
}

export default App;
