import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewProduct.css";

const API_URL = "https://itba-muebleria-jota.onrender.com/api/products";

export default function NewProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("NewProduct mounted", { pathname: window.location.pathname });
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "", // ruta relativa: /img/sofa-x.jpg
    imagenUrl: "", // por si después usan URL absoluta
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // armamos el objeto que va a la API
    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock || 0),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("No se pudo crear el producto");
      }

      const created = await res.json();

      // Después de crear, vamos al detalle del producto nuevo
      // (la API devuelve _id)
      if (created._id) {
        navigate(`/productos/${created._id}`);
      } else {
        // si por alguna razón no hay _id, volvemos al listado
        navigate("/productos");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    // cancelar: volvemos al catálogo
    navigate("/productos");
  }

  return (
    <main className="page new-product-page">
      <h1>Crear nuevo producto</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="new-product-form">
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            name="stock"
            min="0"
            value={form.stock}
            onChange={handleChange}
          />
        </label>

        <label>
          Imagen (ruta relativa, la que usa la API)
          <input
            type="text"
            name="imagen"
            placeholder="/img/silla-nordica.jpg"
            value={form.imagen}
            onChange={handleChange}
          />
        </label>

        <label>
          Imagen URL (opcional, absoluta)
          <input
            type="text"
            name="imagenUrl"
            placeholder="https://..."
            value={form.imagenUrl}
            onChange={handleChange}
          />
        </label>

        <div className="new-product-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear producto"}
          </button>

          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}
