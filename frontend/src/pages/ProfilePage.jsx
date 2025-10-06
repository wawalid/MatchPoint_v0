import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const [mensaje_error, setMensaje] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    user,
    updateUser,
    errors: profileErrors,
    successes: profileSuccess,
  } = useAuth();

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("password", "");
      setValue("identidad", user.identidad || "");
      setValue("dni", user.dni || "");
    }
  }, [user, setValue]);

  useEffect(() => {
    if (location.state?.message && user?.completado !== true) {
      setMensaje(location.state.message);

      const timer = setTimeout(() => {
        setMensaje(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state, user]);

  const onSubmit = async (data) => {
    if (!data.password) {
      data.password = user.password;
    }

    try {
      await updateUser(data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg border border-gray-200">
        {mensaje_error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {mensaje_error}
          </div>
        )}

        <h2 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">          ¡Bienvenido, {user ? user.username : "Usuario"}!
        </h2>

        {(profileErrors || []).map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2 rounded text-center" key={i}>
            {error}
          </div>
        ))}
        {(profileSuccess || []).map((success, i) => (
          <div className="bg-green-500 p-2 text-white my-2 rounded text-center" key={i}>
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
