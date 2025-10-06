import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signin, isAuthenticated, errors: signinErrors } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mensaje_error, setMensaje] = useState(null);

  // Leer mensaje desde la redirección
  useEffect(() => {
    if (location.state?.message) {
      setMensaje(location.state.message);

      const timer = setTimeout(() => setMensaje(null), 4000); // se limpia automáticamente
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="bg-white max-w-md w-full p-10 rounded-2xl shadow-lg border border-gray-200">
        {/* Mensaje desde redirección */}
        {mensaje_error && (
          <div className="bg-red-500 text-white p-4 rounded mb-6 text-center">
            {mensaje_error}
          </div>
        )}

        {/* Errores de login */}
        {(signinErrors || []).map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2 rounded text-center" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Iniciar sesión</h1>

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

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-2 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="flex gap-x-2 justify-center text-gray-700 mt-6 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-orange-500 font-medium hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
