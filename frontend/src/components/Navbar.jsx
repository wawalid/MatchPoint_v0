import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutRequest } from "../api/auth";


function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();


  return (
    <nav className="bg-zinc-100 text-black my-3 flex justify-between items-center py-5 px-10 rounded-lg">
      {/* Logo + Título + Links juntos a la izquierda */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src="../../media/baloncesto_2.png" alt="MatchPoint Logo" className="w-8 h-8" />
          <span className="font-bold text-orange-500 text-xl">MatchPoint</span>
        </div>
        <ul className="flex gap-x-5">
          <Link to="/" className="hover:text-orange-400">Inicio</Link>
          <Link to="/partidos" className="hover:text-orange-400">Partidos</Link>
          <Link to="/crear-partido" className="hover:text-orange-400">Crear Partido</Link>
          {user && user.premium ? (
  <p className="text-green-500">¡Eres usuario Premium!</p>
) : (
  <Link to="/premium" className="hover:text-orange-400">Premium</Link>
)}

        </ul>
      </div>

      {/* Derecha libre (puedes poner avatar, login, etc.) */}
      <div>

        <ul className="flex gap-x-5 text-black">
          {isAuthenticated ? (
            <>
              <li>
                <Link to={"/profile"} className="hover:text-orange-400">Mi perfil</Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400"
                  onClick={() => {
                    logout();
                    const res = logoutRequest();
                    console.log(res);
                  }}
                >
                  Log out
                </Link>
              </li>
            </>
          ) : (
            <>
             
              <li></li>
              <li>
                <Link to={"/login"} className="hover:text-orange-400">Login</Link>
              </li>
              <li>
                <Link to={"/register"} className="hover:text-orange-400">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
