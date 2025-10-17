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

  if (!partido) return <p className="text-center mt-10 text-lg font-medium text-gray-700">Cargando...</p>;

  const esCreador = user?.id === partido.creador?._id;
  const esAdmin = user?.is_admin === true;
  const esJugador = partido.jugadores.some((j) => j._id === user?.id); // Verificación para el usuario actual

  // 🧠 Ordenar jugadores: el creador primero, solo si existe creador
  const jugadoresOrdenados = [...(partido.jugadores || [])].sort((a, b) => {
    if (!partido.creador) return 0;
    // Si 'a' es el creador, va antes que 'b'
    if (a._id === partido.creador._id) return -1;
    // Si 'b' es el creador, va antes que 'a'
    if (b._id === partido.creador._id) return 1;
    return 0;
  });

  return (
    // Contenedor principal responsive y centrado
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* ✅ Notificaciones - Mejorado el estilo y el ancho en móvil */}
      <div className="flex flex-col items-center space-y-3 my-6">
        {profileSuccesses.map((success, index) => (
          <div
            key={index}
            className="bg-green-100 text-green-700 border border-green-300 rounded-lg px-4 py-2 text-sm shadow-md max-w-lg w-full text-center"
          >
            ✅ {success}
          </div>
        ))}
        {profileErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-2 text-sm shadow-md max-w-lg w-full text-center"
          >
            ⚠️ {error}
          </div>
        ))}
      </div>

      {/* Contenedor de detalles del partido */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10 border border-gray-100">
        
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors mb-6"
        >
          ← Volver a partidos
        </button>

        {/* Título y Badge de Estado */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
            {partido.titulo}
          </h1>
          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            esJugador ? 'bg-orange-100 text-orange-700' : 
            partido.estado === 'abierto' ? 'bg-green-100 text-green-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {esJugador ? '¡Estás Apuntado!' : partido.estado.toUpperCase()}
          </span>
        </div>
        
        {/* Información clave del partido (Grid responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 mb-6">
          <p className="flex items-center">
            <span className="text-xl text-orange-500 mr-2">🏀</span> 
            <span className="font-semibold">Deporte:</span> {partido.deporte}
          </p>
          <p className="flex items-center">
            <span className="text-xl text-orange-500 mr-2">📍</span> 
            <span className="font-semibold">Lugar:</span> {partido.lugar}
          </p>
          {partido.ciudad && (
            <p className="flex items-center">
              <span className="text-xl text-orange-500 mr-2">🌆</span> 
              <span className="font-semibold">Ciudad:</span> {partido.ciudad}
            </p>
          )}
          <p className="sm:col-span-1 flex items-center">
            <span className="text-xl text-orange-500 mr-2">📅</span> 
            <span className="font-semibold">Fecha y Hora:</span>{" "}
            {new Date(partido.fecha).toLocaleString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="sm:col-span-2 flex items-center">
            <span className="text-xl text-orange-500 mr-2">👥</span> 
            <span className="font-semibold">Jugadores:</span> {partido.jugadores?.length || 0} / {partido.max_jugadores} 
            {partido.jugadores?.length >= partido.max_jugadores && (
                <span className="ml-2 text-red-500 font-bold text-sm">(COMPLETO)</span>
            )}
          </p>
        </div>
        
        {/* Info sobre el creador */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-base font-bold text-gray-800 mr-2">Organizador/a:</span>
          <span
            className={`${partido.creador?.reputacion > 0
              ? "text-green-600"
              : partido.creador?.reputacion < 0
                ? "text-red-600"
                : "text-gray-700"
              } font-extrabold`}
          >
            {partido.creador?.username || "Desconocido"}
          </span>
          {esCreador && <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">TÚ</span>}
        </div>

        {/* Descripción */}
        {partido.descripcion && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Detalles del Partido</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{partido.descripcion}</p>
          </div>
        )}

        {/* Jugadores Apuntados */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Lista de Jugadores ({partido.jugadores?.length})
          </h2>
          {jugadoresOrdenados.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jugadoresOrdenados.map((jugador) => {
                const rep = jugador.reputacion || 0;
                let colorClass = "text-gray-700";
                if (rep > 0) colorClass = "text-green-600";
                else if (rep < 0) colorClass = "text-red-600";
                
                // Etiquetas de Creador y Tú
                const isCreator = jugador._id === partido.creador?._id;
                const isYou = jugador._id === user?.id;

                return (
                  <li
                    key={jugador._id}
                    className="flex justify-between items-center text-sm p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className={`font-semibold ${colorClass} truncate`}>
                      {jugador.username}
                      {isCreator && <span className="ml-2 text-xs text-blue-500 font-bold">(Creador)</span>}
                      {isYou && !isCreator && <span className="ml-2 text-xs text-orange-500 font-bold">(Tú)</span>}
                    </span>
                    <span className="text-xs text-gray-500 ml-4 font-medium whitespace-nowrap">
                      {rep} Pts
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-200">
              Aún no hay jugadores apuntados. ¡Sé el primero! 🚀
            </p>
          )}
        </div>


        {/* Botones de acción */}
        <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-gray-200">
          
          {/* Unirse o salir */}
          <button
            onClick={async () => {
              const updated = await unirse_salirPartido(partido._id);
              if (updated) setPartido(updated);
            }}
            // Estilo condicional para Unirse (Naranja) o Salir (Rojo/Gris)
            className={`font-bold py-3 px-4 rounded-lg w-full transition-colors ${
              esJugador 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-orange-500 hover:bg-orange-600 text-white"
            } ${
                !user?.id ? 'opacity-50 cursor-not-allowed' : '' // Estilo si no está logueado
            }`}
            disabled={!user?.id} // Deshabilitar si no hay user.id
          >
            {partido.jugadores.some((j) => j._id === user?.id)
              ? "SALIR del partido"
              : "UNIRSE al partido"}
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
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg w-full text-sm transition-colors"
            >
              Eliminar partido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}