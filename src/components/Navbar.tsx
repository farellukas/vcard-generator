function Navbar() {
  return (
    <nav className="navbar">
      {/* header */}
      <div className="navbar-start">
        <a href="/" className="text-xl">
          QR Business Card Generator
        </a>
      </div>

      {/* credits */}
      <div className="navbar-end">
        <p>made by farel.</p>
      </div>
    </nav>
  );
}

export default Navbar;
