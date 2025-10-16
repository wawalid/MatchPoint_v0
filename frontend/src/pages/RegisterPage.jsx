import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    // Validación de contraseñas iguales antes de enviar
    if (values.password !== values.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    signup(values);
  });

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white max-w-md w-full p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Registro</h1>

        {/* Errores del backend */}
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2 rounded" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              placeholder="Nombre de usuario"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">El usuario es obligatorio</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">La contraseña es obligatoria</p>
            )}
          </div>

          {/* Campo repetir contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Repetir contraseña</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              placeholder="Repite la contraseña"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-2 transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="flex gap-x-2 justify-center text-gray-700 mt-6 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-orange-500 font-medium hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
