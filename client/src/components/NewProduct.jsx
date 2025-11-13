import { useState } from "react";
import "../styles/NewProduct.css";

export default function NewProduct({ onCreated, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    imagen: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock || 0)
    };

    try {
      const res = await fetch(
        "https://itba-muebleria-jota.onrender.com/api/productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error("Error creando producto");

      const created = await res.json();
      onCreated?.(created);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="new-product-container">
      <h2>Crear nuevo producto</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={onSubmit} className="new-product-form">

        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            required
            value={form.nombre}
            onChange={onChange}
          />
        </label>

        <label>
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
          />
        </label>

        <label>
          Precio (ARS)
          <input
            type="number"
            name="precio"
            min="0"
            step="0.01"
            required
            value={form.precio}
            onChange={onChange}
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            name="stock"
            min="0"
            value={form.stock}
            onChange={onChange}
          />
        </label>

        <label>
          Imagen (URL absoluta)
          <input
            type="text"
            name="imagenUrl"
            placeholder="https://..."
            value={form.imagenUrl}
            onChange={onChange}
          />
        </label>

        <label>
          Imagen (ruta relativa legacy)
          <input
            type="text"
            name="imagen"
            placeholder="/img/sofa.png"
            value={form.imagen}
            onChange={onChange}
          />
        </label>

        <div className="new-product-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear producto"}
          </button>

          <button type="button" onClick={() => onCancel?.()}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
