import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePartidos } from "../context/PartidosContext";
import { useNavigate } from "react-router-dom"; // arriba de tu componente principal
import { useAuth } from "../context/AuthContext";


export default function PartidoDetalle() {
  const { user } = useAuth();
  const { id } = useParams(); // capturamos el ID del partido desde la URL
  const { getPartido, unirse_salirPartido } = usePartidos();
  const [partido, setPartido] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartido = async () => {
      const data = await getPartido(id);
      setPartido(data);
    };
    fetchPartido();
  }, [id]);

  if (!partido) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-orange-500 hover:underline mb-4"
      >
        ← Volver
      </button>

      {/* Título e info principal */}
      <h1 className="text-3xl font-bold mb-4 text-black">{partido.titulo}</h1>
      <p className="text-gray-600 mb-2">🏀 {partido.deporte}</p>
      <p className="text-gray-600 mb-2">📍 {partido.lugar}</p>
      {partido.ciudad && (
        <p className="text-gray-600 mb-2">🌆 Ciudad: {partido.ciudad}</p>
      )}
      <p className="text-gray-600 mb-2">
        📅{" "}
        {new Date(partido.fecha).toLocaleString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {/* Descripción */}
      {partido.descripcion && (
        <div className="mt-4 text-black">
          <h2 className="text-lg font-semibold mb-2">Descripción</h2>
          <p className="text-gray-700 leading-relaxed">{partido.descripcion}</p>
        </div>
      )}

      {/* Jugadores */}
      <div className="mt-6 text-black">
        <h2 className="text-lg font-semibold mb-2">Jugadores apuntados</h2>
        {partido.jugadores && partido.jugadores.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {partido.jugadores.map((jugador, index) => {
              const rep = jugador.reputacion || 0;
              let colorClass = "text-gray-700"; // por defecto

              if (rep > 0) colorClass = "text-green-600";
              else if (rep < 0) colorClass = "text-red-600";

              return (
                <li key={index} className={colorClass}>
                  {jugador.username} | {rep} puntos
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Aún no hay jugadores apuntados.</p>
        )}
      </div>

      {/* Info jugadores */}
      <p className="text-gray-600 mt-4">
        👥 {partido.jugadores?.length || 0} / {partido.max_jugadores} jugadores
      </p>

      {/* Botón unirse */}
      <button
        onClick={async () => {
          const updated = await unirse_salirPartido(partido._id);
          if (updated) setPartido(updated); // 👈 solo si el backend confirma "ok"
        }}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
      >
        {partido.jugadores.some((j) => j._id === user.id)
          ? "Salir del partido"
          : "Unirse al partido"}
      </button>
    </div>
  );
}
