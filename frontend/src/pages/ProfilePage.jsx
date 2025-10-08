import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { usePartidos } from "../context/PartidosContext";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const [mensaje_error, setMensaje] = useState(null);
  const { user, updateUser, errors: profileErrors, successes: profileSuccess } = useAuth();
  const { partidos, getPartidos } = usePartidos();

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
      setValue("identidad", user.identidad || "");
      setValue("dni", user.dni || "");
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
    if (user?._id) getPartidos(); // si ya tienes un filtro por usuario en el backend, perfecto
  }, [user]);

  const onSubmit = async (data) => {
    if (!data.password) data.password = user.password;
    try {
      await updateUser(data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Panel izquierdo - Perfil */}
        <div className="bg-white w-full md:w-1/3 p-6 rounded-2xl shadow-md border border-gray-200">
          {mensaje_error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
              {mensaje_error}
            </div>
          )}

          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse mb-6">
            ¡Bienvenido, {user ? user.username : "Usuario"}!
          </h2>

          {(profileErrors || []).map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white my-2 rounded text-center">
              {error}
            </div>
          ))}
          {(profileSuccess || []).map((success, i) => (
            <div key={i} className="bg-green-500 p-2 text-white my-2 rounded text-center">
              {success}
            </div>
          ))}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">Username is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Guardar cambios
            </button>
          </form>
        </div>

        {/* Panel derecho - Lista de partidos */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mis partidos creados</h3>
          {partidos && partidos.length > 0 ? (
            <div className="grid gap-4">
              {partidos
                .filter((p) => p.creador?._id === user?._id)
                .map((partido) => (
                  <div
                    key={partido._id}
                    className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-bold text-lg text-gray-800">{partido.titulo}</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {new Date(partido.fecha).toLocaleDateString()} - {partido.lugar}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Jugadores: {partido.jugadores.length}/{partido.max_jugadores}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-4">No has creado ningún partido aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
