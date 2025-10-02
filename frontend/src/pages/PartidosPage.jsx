import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [filters, setFilters] = useState({
    deporte: "Todos",
    fecha: "",
    ciudad: "",
  });

  const partidos = [
    {
      id: 1,
      titulo: "Partido de Baloncesto",
      lugar: "Parque Central",
      fecha: "15 de julio, 18:00",
      jugadores: "8 / 10 Jugadores",
    },
    {
      id: 2,
      titulo: "Partido de Tenis",
      lugar: "Club de Campo",
      fecha: "16 de julio, 10:00",
      jugadores: "2 / 4 Jugadores",
    },
    {
      id: 3,
      titulo: "Partido de Fútbol",
      lugar: "Estadio Municipal",
      fecha: "17 de julio, 20:00",
      jugadores: "15 / 22 Jugadores",
    },
    {
      id: 4,
      titulo: "Partido de Voleibol",
      lugar: "Playa de la Ciudad",
      fecha: "18 de julio, 16:00",
      jugadores: "10 / 12 Jugadores",
    },
    {
      id: 5,
      titulo: "Pádel Nivel Medio",
      lugar: "Club de Pádel Indoor",
      fecha: "19 de julio, 19:30",
      jugadores: "3 / 4 Jugadores",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
    

      {/* Main */}
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
          <div className="bg-gray-100 p-6 text-center rounded-lg border">
            <p className="font-semibold text-gray-700">Anuncio</p>
            <p className="text-sm text-gray-500">Promociona tu evento aquí</p>
          </div>
        </aside>

        {/* Feed de partidos */}
        <section className="flex-1">
          <h2 className="font-semibold text-xl mb-6">Partidos Disponibles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partidos.map((partido) => (
              <div
                key={partido.id}
                className="border rounded-lg shadow-sm p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1">{partido.titulo}</h3>
                  <p className="text-sm text-gray-600">{partido.lugar}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    📅 {partido.fecha}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    👥 {partido.jugadores}
                  </p>
                </div>
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Unirse
                </button>
              </div>
            ))}
            <div className="border rounded-lg shadow-sm p-5 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Anuncio - Tu marca aquí</p>
            </div>
          </div>
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
