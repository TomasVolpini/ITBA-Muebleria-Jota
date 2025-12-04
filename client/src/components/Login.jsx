import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setServerError("Completa ambos campos");
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Iniciar sesión</h2>

      {/* ERROR + link a contacto solo cuando algo falla */}
      {serverError && (
        <p className="auth-error">
          {serverError}{" "}
          <span>
            Si el problema persiste,{" "}
            <Link to="/contacto" className="login-help-link">
              contactanos
            </Link>
            .
          </span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="Tu contraseña"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      {/* ESTO SIEMPRE ESTÁ VISIBLE */}
      <div className="login-footer">
        <p>
          ¿No tenés cuenta?{" "}
          <Link to="/register">Registrate acá</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
