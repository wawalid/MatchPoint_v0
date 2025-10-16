import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePartidos } from "../context/PartidosContext";
import { useAuth } from "../context/AuthContext";

export default function PartidoDetalle() {
  const { user } = useAuth();
  const { id } = useParams();
  const {
    getPartido,
    unirse_salirPartido,
    deletePartido,
    successes: profileSuccesses,
    errors: profileErrors,
  } = usePartidos();

  const [partido, setPartido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartido = async () => {
      const data = await getPartido(id);
      setPartido(data);
    };
    fetchPartido();
  }, [id]);

  if (!partido) return <p className="text-center mt-10">Cargando...</p>;

  const esCreador = user?.id === partido.creador?._id;
  const esAdmin = user?.is_admin === true;

  // 🧠 Ordenar jugadores: el creador primero, solo si existe creador
  const jugadoresOrdenados = [...(partido.jugadores || [])].sort((a, b) => {
    if (!partido.creador) return 0;
    if (a._id === partido.creador._id) return -1;
    if (b._id === partido.creador._id) return 1;
    return 0;
  });

  return (
    <div>
      {/* ✅ Notificaciones */}
      <div className="flex flex-col items-center space-y-2 my-4">
        {profileSuccesses.map((success, index) => (
          <div
            key={index}
            className="bg-green-100 text-green-700 border border-green-300 rounded-md px-3 py-1 text-sm shadow-sm max-w-fit"
          >
            {success}
          </div>
        ))}
        {profileErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-100 text-red-700 border border-red-300 rounded-md px-3 py-1 text-sm shadow-sm max-w-fit"
          >
            {error}
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-8">
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

                {/* Info sobre el creador */}
        <h2 className="mt-6 text-black">
          <span className="text-lg font-semibold mb-2 text-black">Creador/a: </span>
          <span
            className={`${partido.creador?.reputacion > 0
              ? "text-green-600"
              : partido.creador?.reputacion < 0
                ? "text-red-600"
                : "text-gray-700"
              } font-semibold`}
          >
            {partido.creador?.username || "Desconocido"}
          </span>
        </h2>


        {/* Jugadores */}
        <div className="mt-6 text-black">
          <h2 className="text-lg font-semibold mb-2">Jugadores apuntados</h2>
          {jugadoresOrdenados.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {jugadoresOrdenados.map((jugador, index) => {
                const rep = jugador.reputacion || 0;
                let colorClass = "text-gray-700";
                if (rep > 0) colorClass = "text-green-600";
                else if (rep < 0) colorClass = "text-red-600";

              

                return (
                  <li
                    key={index}
                    className={`${colorClass} ${esCreador ? "font-bold" : ""}`}
                  >
                    {jugador.username}
                    {" "}
                    | {rep} puntos
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Aún no hay jugadores apuntados.</p>
          )}
        </div>



        <p className="text-gray-600 mt-4">
          👥 {partido.jugadores?.length || 0} / {partido.max_jugadores} jugadores
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col gap-3 mt-6">
          {/* Unirse o salir */}
          <button
            onClick={async () => {
              const updated = await unirse_salirPartido(partido._id);
              if (updated) setPartido(updated);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            {partido.jugadores.some((j) => j._id === user.id)
              ? "Salir del partido"
              : "Unirse al partido"}
          </button>

          {/* 🗑️ Botón eliminar (solo creador o admin) */}
          {(esCreador || esAdmin) && (
            <button
              onClick={async () => {
                if (confirm("¿Seguro que quieres eliminar este partido?")) {
                  await deletePartido(partido._id);
                  navigate("/partidos"); // redirigir tras borrar
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            >
              Eliminar partido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
