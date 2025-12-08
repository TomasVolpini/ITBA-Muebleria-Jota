import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css"; // 👈 mismo CSS que usa Login

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    if (name === "nombre" && value.trim().length < 3) {
      error = "El nombre debe tener al menos 3 caracteres";
    }

    if (name === "email" && !value.includes("@")) {
      error = "Email inválido";
    }

    if (name === "password" && value.length < 6) {
      error = "La contraseña debe tener al menos 6 caracteres";
    }

    if (name === "confirmPassword" && value !== form.password) {
      error = "Las contraseñas no coinciden";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // si hay errores de validación, no mando nada
    if (Object.values(errors).some((err) => err && err.length > 0)) return;

    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setServerError("Todos los campos son obligatorios");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setServerError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await register({
        nombre: form.nombre,
        email: form.email,
        password: form.password,
      });
      // después de registrarse lo mandamos a login
      navigate("/login");
    } catch (err) {
      setServerError(err.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Crear cuenta</h2>

      {serverError && <p className="auth-error">{serverError}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Nombre</label>
          <input
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="auth-error">{errors.nombre}</span>}
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="auth-error">{errors.email}</span>}
        </div>

        <div className="auth-field">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="Crea una contraseña"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <span className="auth-error">{errors.password}</span>}
        </div>

        <div className="auth-field">
          <label>Confirmar contraseña</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Repetí tu contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="auth-error">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      {/* footer igual que en login pero al revés */}
      <div className="login-footer">
        <p>
          ¿Ya tenés cuenta?{" "}
          <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
