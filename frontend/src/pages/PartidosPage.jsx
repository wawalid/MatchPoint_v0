import { useState, useEffect } from "react";
import { usePartidos } from "../context/PartidosContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // arriba de tu componente principal

function HomePage() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    deporte: "Todos",
    fecha: "",
    ciudad: "",
  });

  const { partidos, loading, getPartidos } = usePartidos();

  // cargar partidos cuando se monta
  useEffect(() => {
    getPartidos();
  }, []);

  // filtrar partidos
  const filteredPartidos = partidos.filter((partido) => {
    let matches = true;

    // filtro deporte
    if (filters.deporte !== "Todos" && partido.deporte !== filters.deporte) {
      matches = false;
    }

    // filtro fecha (compara solo la parte de día, no horas)
    if (filters.fecha) {
      const partidoDate = new Date(partido.fecha).toISOString().split("T")[0];
      if (partidoDate !== filters.fecha) {
        matches = false;
      }
    }

    // filtro ciudad (case insensitive)
    if (
      filters.ciudad &&
      !partido.ciudad.toLowerCase().includes(filters.ciudad.toLowerCase())
    ) {
      matches = false;
    }

    return matches;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 rounded-lg ">
      <main className="flex max-w-7xl mx-auto px-8 py-10 gap-12">
        {/* Sidebar filtros */}
        <aside className="w-1/4 space-y-6">
          <h2 className="font-semibold text-lg">Filtros</h2>
          <div>
            <label className="block text-sm font-medium">Deporte</label>
            <select
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={filters.deporte}
              onChange={(e) =>
                setFilters({ ...filters, deporte: e.target.value })
              }
            >
              <option>Todos</option>
              <option>Fútbol</option>
              <option>Baloncesto</option>
              <option>Tenis</option>
              <option>Voleibol</option>
              <option>Pádel</option>
              {/* <option>Running</option>
              <option>Ciclismo</option>
              <option>Natación</option>
              <option>Senderismo</option> */}
              {/* <option>Gimnasio</option> */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={filters.fecha}
              onChange={(e) =>
                setFilters({ ...filters, fecha: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ciudad</label>
            <input
              type="text"
              placeholder="Ej: Madrid"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={filters.ciudad}
              onChange={(e) =>
                setFilters({ ...filters, ciudad: e.target.value })
              }
            />
          </div>
          {!user?.premium && (
            <div className="bg-gray-100 p-6 text-center rounded-lg border">
              <p className="font-semibold text-gray-700">Anuncio</p>
              <p className="text-sm text-gray-500">Promociona tu evento aquí</p>
            </div>
          )}
        </aside>

        {/* Feed de partidos */}
        <section className="flex-1">
          <h2 className="font-semibold text-xl mb-6">Partidos Disponibles</h2>

          {loading ? (
            <p>Cargando partidos...</p>
          ) : filteredPartidos.length === 0 ? (
            <p>No hay partidos que coincidan con los filtros</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartidos.map((partido) => (
                <div
  key={partido._id}
  onClick={() => navigate(`/partido/${partido._id}`)}
  className="border rounded-lg shadow-sm p-5 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow duration-200"
>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{partido.titulo}</h3>
                    <p className="text-sm text-gray-600">{partido.deporte}</p>
                    <p className="text-sm text-gray-600">{partido.lugar}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      📅{" "}
                      {new Date(partido.fecha).toLocaleString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      👥 {partido.jugadores?.length || 0} /{" "}
                      {partido.max_jugadores} Jugadores
                    </p>
                  </div>
                  <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
                    Unirse
                  </button>
                </div>
              ))}
              {!user?.premium && (
                <div className="border rounded-lg shadow-sm p-5 flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Anuncio - Tu marca aquí</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MatchPoint. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default HomePage;
