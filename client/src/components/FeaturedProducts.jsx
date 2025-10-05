export default function FeaturedProducts({ products, setRuta }) {
	// Seleccionar solo los primeros 4 productos para destacados
	const featuredProducts = products.slice(0, 4);

	function handleClick(productId) {
		setRuta(`${productId}`);
	}

	return (
		<section className="destacados">
			<h2 className="destacados__title">Productos destacados</h2>
			<div className="productos-grid">
				{featuredProducts.map((product) => {
					const urlImg = `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${product.imagen}`;

					return (
						<div key={product.id} className="featured-card">
							<img src={urlImg} alt={product.nombre} />
							<div className="featured-card__content">
								<p className="featured-card__name">{product.nombre}</p>
								<a 
									onClick={() => handleClick(product.id)}
									className="btn-overlay"
								>
									Ver Detalles
								</a>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
