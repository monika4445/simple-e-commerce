import './Header.css';

function Header() {
  return (
    <header className="header-nav">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__list-item">
            <a href="/" className="nav__link">Men</a>
          </li>
          <li className="nav__list-item">
            <a href="/" className="nav__link">Women</a>
          </li>
          <li className="nav__list-item">
            <a href="/" className="nav__link">Kids</a>
          </li>
          <li className="nav__list-item">
            <a href="/" className="nav__link">Sale</a>
          </li>
        </ul>
        <form action="#" method="get" className="search-form">
        <input type="text" name="q" placeholder="Search" />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      </nav>
    </header>
  );
}

export default Header;
