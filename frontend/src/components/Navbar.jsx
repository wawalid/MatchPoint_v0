import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutRequest } from "../api/auth";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    logoutRequest();
  };

  return (
    <nav className="bg-zinc-100 text-black my-3 flex justify-between items-center py-5 px-6 md:px-10 rounded-lg relative">
      {/* Logo + Título + Links (izquierda) */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/xCggPBmH/imatge-2025-10-08-191207782.png"
            alt="MatchPoint Logo"
            className="w-10 h-8"
          />
          <span className="font-bold text-orange-500 text-xl">MatchPoint</span>
        </div>

        {/* Links principales (solo visibles en escritorio) */}
        <ul className="hidden md:flex gap-x-5">
          <Link to="/" className="hover:text-orange-400">
            Inicio
          </Link>
          <Link to="/partidos" className="hover:text-orange-400">
            Partidos
          </Link>
          <Link to="/crear-partido" className="hover:text-orange-400">
            Crear Partido
          </Link>
          {user && user.premium ? (
            <p className="text-green-500">¡Eres usuario Premium!</p>
          ) : (
            <Link to="/premium" className="hover:text-orange-400">
              Premium
            </Link>
          )}
        </ul>
      </div>

      {/* Menú derecho (perfil, login...) */}
      <div className="hidden md:flex">
        <ul className="flex gap-x-5 text-black">
          {isAuthenticated ? (
            <>
              <li>
                <Link to={"/profile"} className="hover:text-orange-400">
                  Mi perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-orange-400"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"} className="hover:text-orange-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/register"} className="hover:text-orange-400">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Botón hamburguesa (solo móvil) */}
      <button
        className="md:hidden text-orange-500 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-100 shadow-md rounded-b-lg py-5 flex flex-col items-center gap-4 md:hidden z-50">
          <Link
            to="/"
            className="hover:text-orange-400"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/partidos"
            className="hover:text-orange-400"
            onClick={() => setMenuOpen(false)}
          >
            Partidos
          </Link>
          <Link
            to="/crear-partido"
            className="hover:text-orange-400"
            onClick={() => setMenuOpen(false)}
          >
            Crear Partido
          </Link>
          {user && user.premium ? (
            <p className="text-green-500">¡Eres usuario Premium!</p>
          ) : (
            <Link
              to="/premium"
              className="hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              Premium
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="hover:text-orange-400"
                onClick={() => setMenuOpen(false)}
              >
                Mi perfil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="hover:text-orange-400"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-orange-400"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-orange-400"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
