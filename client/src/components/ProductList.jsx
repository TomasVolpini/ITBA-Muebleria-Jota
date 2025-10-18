import ProductCard from "./ProductCard";
import { useState, useRef, useEffect } from "react";
import "../styles/ProductList.css";

export default function ProductList({ products, setRuta }) {
  // Agrupar productos por categoría
  const groupByCategory = (items) => {
    const grouped = {};
    items.forEach(p => {
      const categoria = p.categoria || "Sin categoría";
      (grouped[categoria] ||= []).push(p);
    });
    return grouped;
  };

  const grouped = groupByCategory(products);
  const categories = Object.keys(grouped).sort();

  return (
    <div id="grid" aria-label="Catálogo por categoría">
      {categories.map(category => (
        <CategoryBlock
          key={category}
          category={category}
          products={grouped[category]}
          setRuta={setRuta}
        />
      ))}
    </div>
  );
}

function CategoryBlock({ category, products, setRuta }) {
  const trackRef = useRef(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  // Calcular el ancho de una tarjeta + gap
  const getCardWidth = () => {
    if (!trackRef.current) return 280;
    const sample = trackRef.current.querySelector(".card");
    if (!sample) return 280;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap || "16");
    return Math.ceil(sample.getBoundingClientRect().width + gap);
  };

  // Actualizar estado de los botones
  const updateArrows = () => {
    if (!trackRef.current) return;
    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth - 1;
    setDisablePrev(trackRef.current.scrollLeft <= 0);
    setDisableNext(trackRef.current.scrollLeft >= maxScroll);
  };

  // Desplazarse por cantidad de tarjetas
  const scrollByCards = (direction = 1) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction * getCardWidth(),
      behavior: "smooth"
    });
    setTimeout(updateArrows, 280);
  };

  // Event listeners
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => updateArrows();
    const handleResize = () => updateArrows();

    track.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Inicializar estado
    updateArrows();

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Manejar teclas de navegación
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    }
  };

  return (
    <section className="category-block">
      <h2 className="category-title">{category}</h2>

      <div className="carousel">
        <button
          className="carousel-btn prev"
          onClick={() => scrollByCards(-1)}
          disabled={disablePrev}
          aria-label={`Desplazar ${category} hacia la izquierda`}
        >
          &#10094;
        </button>

        <div
          className="track"
          ref={trackRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              setRuta={setRuta}
            />
          ))}
        </div>

        <button
          className="carousel-btn next"
          onClick={() => scrollByCards(1)}
          disabled={disableNext}
          aria-label={`Desplazar ${category} hacia la derecha`}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}
