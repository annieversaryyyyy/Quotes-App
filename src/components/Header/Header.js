import "./Header.css";
function Header() {
  return (
    <header className="nav">
      <a href="/" className="nav-logo-link">
        <div className="nav-logo">Цитаты Джейсона Стетхэма</div>
      </a>
      <nav className="nav-menu">
        <a className="nav-link" href="/new">
          Создать новую цитату
        </a>
        <a className="nav-link" href="/">
          Все цитаты
        </a>
      </nav>
    </header>
  );
}

export default Header;
