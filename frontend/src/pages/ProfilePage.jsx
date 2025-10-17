import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { usePartidos } from "../context/PartidosContext";
import { useLocation } from "react-router-dom";


function ProfilePage() {
  const location = useLocation();
  const [mensaje_error, setMensaje] = useState(null);
  const { user, updateUser, errors: profileErrors, successes: profileSuccess } = useAuth();
  const { partidosByUser, getPartidosByUser } = usePartidos();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("password", "");
    }
  }, [user, setValue]);

  // Mensaje temporal
  useEffect(() => {
    if (location.state?.message && user?.completado !== true) {
      setMensaje(location.state.message);
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state, user]);

  // Cargar partidos creados por el usuario
useEffect(() => {
  if (user?._id)
    console.log("usuario autenticado:", user._id);
    getPartidosByUser();
}, [user]);


  const onSubmit = async (data) => {
    // Si la contraseña está vacía, no la enviamos al backend
    if (!data.password) {
      delete data.password;
    }
    try {
      await updateUser(data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 sm:py-12">
      {/* Contenedor principal: Cambiado md:flex-row a flex-col por defecto */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Panel izquierdo - Perfil y Formulario (se convierte en la primera columna en escritorio) */}
        <div className="bg-white w-full md:w-1/3 p-6 rounded-2xl shadow-xl border border-gray-200">
          {mensaje_error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
              {mensaje_error}
            </div>
          )}

          {/* Bienvenida */}
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse mb-4 border-b pb-4">
            ¡Bienvenido, {user ? user.username : "Usuario"}!
          </h2>

        {/* Reputación */}
          {user && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl px-4 py-3 mb-6 shadow-sm">
              <div>
                <p className="text-sm text-gray-700 font-medium">Tu reputación</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-2xl font-bold ${
                      user.reputacion > 0
                        ? "text-green-600"
                        : user.reputacion < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {user.reputacion || 0}
                  </span>
                  <span className="text-yellow-500 text-xl animate-pulse">★</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 italic mt-2 sm:mt-0 sm:ml-auto sm:text-right">
                {user.reputacion > 0
                  ? "Jugador confiable"
                  : user.reputacion < 0
                  ? "Debe mejorar"
                  : "Sin valoraciones aún"}
              </div>
            </div>
          )}

          {/* Errores y éxitos (Mejoramos la apariencia para ser más visible) */}
          {(profileErrors || []).map((error, i) => (
            <div
              key={i}
              className="bg-red-100 text-red-700 border border-red-300 p-3 my-2 rounded-lg text-center font-medium"
            >
              ⚠️ {error}
            </div>
          ))}
          {(profileSuccess || []).map((success, i) => (
            <div
              key={i}
              className="bg-green-100 text-green-700 border border-green-300 p-3 my-2 rounded-lg text-center font-medium"
            >
              ✅ {success}
            </div>
          ))}

          {/* Formulario */}
          <h3 className="text-xl font-semibold text-gray-800 my-4 pt-4 border-t">
            Actualizar Perfil
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  El Username es obligatorio
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña (dejar vacío para no cambiar)
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors shadow-md"
            >
              Guardar cambios
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Todavia no se pueden actualizar los datos del perfil, pero estamos trabajando en ello. :D
            </p>
          </form>
        </div>

        {/* Panel derecho - Lista de partidos (se convierte en la segunda columna en escritorio) */}
        <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
            ⚽ Mis partidos creados
          </h3>

            {/* Grilla responsive para la lista de partidos: 1 columna en móvil, 2 en tablet */}
          {partidosByUser && partidosByUser.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partidosByUser.map((partido) => (
                <div
                  key={partido._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-lg text-gray-800 truncate">
                    {partido.titulo}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    📅{" "}
                    {new Date(partido.fecha).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                    - {partido.lugar}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    👥 Jugadores: {partido.jugadores.length}/{partido.max_jugadores}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Estado:
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${partido.estado === 'abierto' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                      {partido.estado}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
              No has creado ningún partido aún. ¡Es hora de organizar uno! 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;