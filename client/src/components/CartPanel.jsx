const CartPanel = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
	function precioARS(valor) {
		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
			minimumFractionDigits: 0,
		}).format(valor);
	}

	// Calcular el total del carrito
	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
	};

	// Incrementar cantidad
	const handleIncrement = (itemId) => {
		const item = cartItems.find(i => i.id === itemId);
		if (item) {
			onUpdateQuantity(itemId, item.quantity + 1);
		}
	};

	// Decrementar cantidad
	const handleDecrement = (itemId) => {
		const item = cartItems.find(i => i.id === itemId);
		if (item && item.quantity > 1) {
			onUpdateQuantity(itemId, item.quantity - 1);
		} else if (item && item.quantity === 1) {
			// Si la cantidad es 1, eliminar el item
			onRemoveItem(itemId);
		}
	};

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
			)}

			{/* Panel del carrito */}
			<aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
				{/* Header del carrito */}
				<div className="cart-drawer__header">
					<h2>Mi carrito</h2>
					<button
						className="cart-drawer__close"
						aria-label="Cerrar carrito"
						onClick={onClose}
					>
						×
					</button>
				</div>

				{/* Body - Lista de productos */}
				<div className="cart-drawer__body">
					{cartItems.length === 0 ? (
						<p className="cart-empty">Tu carrito está vacío.</p>
					) : (
						<ul className="cart-items-list">
							{cartItems.map((item) => {
								const urlImg = `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${item.imagen}`;

								return (
									<li key={item.id} className="cart-item">
										<img
											src={urlImg}
											alt={item.nombre}
											className="cart-item__image"
										/>
										<div className="cart-item__details">
											<p className="cart-item__name">{item.nombre}</p>
											<p className="cart-item__price">{precioARS(item.precio)}</p>
										</div>
										<div className="cart-item__quantity">
											<button
												className="cart-item__btn"
												onClick={() => handleDecrement(item.id)}
												aria-label="Disminuir cantidad"
											>
												−
											</button>
											<span className="cart-item__count">{item.quantity}</span>
											<button
												className="cart-item__btn"
												onClick={() => handleIncrement(item.id)}
												aria-label="Aumentar cantidad"
											>
												+
											</button>
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</div>

				{/* Resumen del carrito - FUERA del body scrolleable */}
				{cartItems.length > 0 && (
					<div className="cart-summary">
						<div className="cart-summary__total">
							<strong>Total:</strong>
							<span className="cart-summary__amount">
								{precioARS(calculateTotal())}
							</span>
						</div>
						<button className="btn-checkout">
							Proceder al pago
						</button>
					</div>
				)}
			</aside>
		</>
	);
};

export default CartPanel;
