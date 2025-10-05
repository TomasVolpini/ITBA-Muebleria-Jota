function Footer() {
    return (
    <footer>
        <div className="footer-container">
            {/* Columna 1: Marca / Descripción */}
            <div className="footer-col">
                <h3 className="footer-title">Hermanos Jota</h3>
                <p className="footer-desc">
                    Diseño argentino contemporáneo con énfasis en materiales nobles y fabricación artesanal.
                </p>
            </div>

            {/* Columna 2: Contacto físico */}
            <div className="footer-col">
                <h4>Showroom</h4>
                <p>
                    Av. Corrientes 1234<br />
                    Buenos Aires, Argentina
                </p>
                <p>
                    <strong>Horarios:</strong><br />
                    Lun - Vie: 9:00 – 18:00<br />
                    Sáb: 10:00 – 14:00
                </p>
            </div>

            {/* Columna 3: Contacto */}
            <div className="footer-col">
                <h4>Contacto</h4>
                <p>
                    ¿Tenés consultas o querés coordinar una visita?<br />
                    <a href="">
                        Visitá nuestra página de contacto &rarr;
                    </a>
                </p>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; 2025 Hermanos Jota — Todos los derechos reservados.</p>
        </div>
    </footer>
    );
}

export default Footer;
