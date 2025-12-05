import "../styles/Contacto.css";
import FormularioContacto from "../components/FormularioContacto";
import TallerCard from "../components/TallerCard";
import ContactoCard from "../components/ContactoCard";
import RedesCard from "../components/RedesCard";
import MarcaCard from "../components/MarcaCard";

const ContactoPage = () => {
  return (
    <section className="contacto-container">
      <div className="grid-contacto">
        {/* Columna izquierda: Formulario */}
        <FormularioContacto />

        {/* Columna derecha: Cards */}
        <div className="grid-cards">
          <TallerCard />
          <ContactoCard />
          <RedesCard />
          <MarcaCard />
        </div>
      </div>
    </section>
  );
};

export default ContactoPage;
