import { useState, useEffect } from "react";
import { usePartidos } from "../context/PartidosContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

function HomePage() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    deporte: "Todos",
    fecha: "",
    ciudad: "",
  });

  const { partidos, loading, getPartidos } = usePartidos();
  // Asumiendo que 'successes' y 'errors' vienen del mismo context
  const { successes, errors } = usePartidos();


  
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
  
  // cargar partidos cuando se monta
  useEffect(() => {
    getPartidos();
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-gray-900 rounded-lg ">
      {/* Las notificaciones están bien para responsive con 'absolute top-0 left-1/2...' */}
      <main className="relative flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 gap-8 lg:gap-12">
        
        {/* 🔔 Notificaciones */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-20 px-4 sm:px-0">
          {successes.map((msg, i) => (
            <div
              key={i}
              className="bg-green-100 text-green-700 border border-green-300 rounded-md px-3 py-2 text-sm shadow-md mb-2 text-center animate-fade"
            >
              {msg}
            </div>
          ))}
          {errors.map((msg, i) => (
            <div
              key={i}
              className="bg-red-100 text-red-700 border border-red-300 rounded-md px-3 py-2 text-sm shadow-md mb-2 text-center animate-fade"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* --- */}

        {/* Sidebar filtros */}
        {/* Cambiado de w-1/4 a w-full y luego lg:w-1/4, y añadido flex-wrap para móviles */}
        <aside className="w-full lg:w-1/4 space-y-6 p-4 lg:p-0 border-b lg:border-none pb-6">
          <h2 className="font-semibold text-lg">Filtros</h2>
          {/* Contenedor de filtros para mostrar en línea en pantallas pequeñas */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-0 lg:space-y-6">
            <div className="w-full sm:w-1/3 lg:w-full">
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
                <option>Otro deporte</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3 lg:w-full">
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
            <div className="w-full sm:w-1/3 lg:w-full">
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
          </div>
          
          {!user?.premium && (
            <div className="bg-gray-100 p-6 text-center rounded-lg border hidden lg:block">
              <p className="font-semibold text-gray-700">Anuncio</p>
              <p className="text-sm text-gray-500">Promociona tu evento aquí</p>
            </div>
          )}
        </aside>

        {/* --- */}

        {/* Feed de partidos */}
        {/* Aseguramos que ocupe el espacio restante en pantallas grandes (lg:flex-1) */}
        <section className="flex-1 w-full">
          <h2 className="font-semibold text-xl mb-6">Partidos Disponibles</h2>

          {loading ? (
            <p>Cargando partidos...</p>
          ) : filteredPartidos.length === 0 ? (
            <p>No hay partidos que coincidan con los filtros</p>
          ) : (
            /* Ajuste clave: Grilla de 1 columna por defecto, 2 en md, 3 en lg */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {/* Anuncio en la grilla para no-premium */}
              {!user?.premium && (
                // Muestra en todas las pantallas si no hay más partidos que llenar la grilla
                <div className="border rounded-lg shadow-sm p-5 flex items-center justify-center bg-gray-100 min-h-[150px]">
                  <p className="text-gray-500">Anuncio - Tu marca aquí</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* --- */}

      {/* Footer */}
      <footer className="border-t mt-8 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MatchPoint. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default HomePage;