// src/components/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user, logout, changePassword } = useAuth();

  const [showChange, setShowChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    if (typeof logout === "function") logout();
  };

  const safe = (value) => value ?? "No cargado";

  const submitChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Completá todos los campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }
    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      let ok = false;
      // Preferir función del contexto si existe
      if (typeof changePassword === "function") {
        await changePassword({ currentPassword, newPassword });
        ok = true;
      } else {
        // Fallback: petición al backend (ajustar endpoint según tu API)
        const res = await fetch("/api/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        ok = res.ok;
        if (!ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message ?? "Error al cambiar la contraseña");
        }
      }

      if (ok) {
        setMessage("Contraseña actualizada correctamente.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowChange(false);
      }
    } catch (err) {
      setError(err.message ?? "No se pudo actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Mi perfil</h2>

      {/* Datos personales */}
      <section className="profile-card">
        <h3 className="profile-section-title">Datos personales</h3>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Nombre</label>
            <input value={safe(user?.nombre)} disabled />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="profile-card">
        <h3 className="profile-section-title">Contacto</h3>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Email</label>
            <input value={safe(user?.email)} disabled />
          </div>
        </div>
      </section>

      {/* Seguridad / contraseña */}
      <section className="profile-card">
        <h3 className="profile-section-title">Seguridad</h3>
        <p className="profile-text">
          Por tu seguridad, no mostramos tu contraseña. Podés actualizarla
          cuando quieras.
        </p>

        {!showChange ? (
          <button
            type="button"
            className="profile-btn profile-btn-outline"
            onClick={() => {
              setShowChange(true);
              setMessage("");
              setError("");
            }}
          >
            Cambiar contraseña
          </button>
        ) : (
          <form onSubmit={submitChangePassword} className="change-password-form">
            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}
            <div className="profile-field">
              <label>Contraseña actual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="profile-field">
              <label>Nueva contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="profile-field">
              <label>Confirmar nueva contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="profile-actions" style={{ gap: "8px" }}>
              <button
                type="submit"
                className="profile-btn profile-btn-outline"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                className="profile-btn"
                onClick={() => {
                  setShowChange(false);
                  setError("");
                  setMessage("");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Acciones finales */}
      <div className="profile-actions">
        <button
          type="button"
          className="profile-btn profile-btn-logout"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
