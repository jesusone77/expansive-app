import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "/auth.js";

function LoginForm() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(VITE_API_URL + "/api/login", form);
      setToken(res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Iniciar sesión</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        name="username"
        type="text"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
