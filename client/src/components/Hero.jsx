import "../styles/Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="hero--gradiente">
            <div className="hero__content">
                <h1 className="hero__title">
                    Artesanía con alma y diseño único
                </h1>
                <p className="hero__subtitle">
                    Descubrí productos creados para durar y enamorar.
                </p>
                <Link to="/productos" className="btn-hero">
                    Ver productos
                </Link>
            </div>
        </section>
    );
};

export default Hero;
