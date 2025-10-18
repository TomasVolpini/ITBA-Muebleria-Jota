const HamburgerMenu = ({ isOpen, onToggle }) => {
    return (
    <button
    className={`menu-toggle ${isOpen ? 'open' : ''}`}
    aria-label="Abrir menú de navegación"
    aria-expanded={isOpen ? 'true' : 'false'}
    onClick={onToggle}
    >
        <div></div>
        <div></div>
        <div></div>
    </button>
    );
};

export default HamburgerMenu;
