import headerLogo from "../images/header-logo.svg";

import { Routes, Link, Route } from "react-router-dom";

function Header({ onSignOut, headerEmail }) {
  return (
    <header className="header">
      <img
        src={headerLogo}
        className="header__logo"
        alt="Логотип Mesto - Россия"
      />
      <div className="header__link">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{headerEmail}</p>
                <Link
                  to={"/signin"}
                  className="auth__link auth__link-out"
                  onClick={onSignOut}
                >
                  Выйти
                </Link>
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Link to={"/signup"} className="auth__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/signup"
            element={
              <Link to={"/signin"} className="auth__link">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
