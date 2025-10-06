import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {

    const { register, handleSubmit, formState:
        { errors }
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate("/")
    }, [isAuthenticated])


    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
       <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="bg-white max-w-md w-full p-10 rounded-2xl shadow-lg border border-gray-200">
    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Registro</h1>

    {/* Errores */}
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

      {/* Si quieres habilitar email en el futuro, puedes descomentar este bloque */}
      {/* 
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">El email es obligatorio</p>
        )}
      </div>
      */}

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











    )
}

export default RegisterPage;