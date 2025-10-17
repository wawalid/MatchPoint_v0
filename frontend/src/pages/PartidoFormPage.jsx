import { useForm } from "react-hook-form";
// import { usePartidos } from "../context/PartidosContext"; // Context adaptado a partidos
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePartidos } from "../context/PartidosContext";

function PartidoFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createPartido, getPartido, updatePartido } = usePartidos();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadPartido() {
      if (params.id) {
        const partido = await getPartido(params.id);
        if (partido) {
          setValue("titulo", partido.titulo);
          setValue("deporte", partido.deporte);
          setValue("lugar", partido.lugar);
          setValue("ciudad", partido.ciudad);
          const fechaParaInput = partido.fecha
            ? partido.fecha.substring(0, 16)
            : "";
          setValue("fecha", fechaParaInput);
          setValue("max_jugadores", partido.max_jugadores);
          setValue("descripcion", partido.descripcion);
        }
      }
    }
    loadPartido();
  }, [params.id, getPartido, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updatePartido(params.id, data);
    } else {
      createPartido(data);
    }
    navigate("/partidos");
  });

  return (
    // 👇 CORRECCIÓN DE MARGEN: Se eliminó "w-full"
    <div className="bg-zinc-100 max-w-3xl p-6 md:p-16 rounded-3xl mx-4 md:mx-auto mt-10 shadow-lg">
      {/* Título centrado */}
      <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-2">
        {params.id ? "Editar Partido" : "Crea tu partido"}
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Rellena los detalles para organizar tu próximo evento deportivo.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Título del partido */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Título del partido</label>
          <input
            type="text"
            placeholder="Ej: Partido de Fútbol"
            {...register("titulo", { required: true })}
            className="w-full bg-zinc-300 text-gray-900 px-4 py-2 rounded-md placeholder-gray-500"
            autoFocus
          />
        </div>

        {/* Deporte */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Deporte</label>
          <select
            {...register("deporte", { required: true })}
            className="w-full bg-zinc-300 text-gray-900 placeholder-gray-800 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Selecciona un deporte</option>
            <option value="Fútbol">Fútbol</option>
            <option value="Baloncesto">Baloncesto</option>
            <option value="Tenis">Tenis</option>
            <option value="Voleibol">Voleibol</option>
            <option value="Pádel">Pádel</option>
            <option value="Otro">Otro deporte</option>
          </select>
        </div>

        {/* Fecha y Lugar en la misma fila (en escritorio) */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-700 mb-1">Fecha y hora</label>
            <input
              type="datetime-local"
              {...register("fecha", { required: true })}
              className="w-full bg-zinc-300 text-gray-900 px-4 py-2 rounded-md placeholder-gray-500"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            {/* 👇 CORRECCIÓN DE LA ETIQUETA 'g' */}
            <label className="text-gray-700 mb-1">Lugar</label>
            <input
              type="text"
              placeholder="Ej: Parque Central"
              {...register("lugar", { required: true })}
              className="w-full bg-zinc-300 text-gray-900 px-4 py-2 rounded-md placeholder-gray-500"
            />
          </div>
        </div>

        {/* Ciudad y Max jugadores (en la misma fila opcionalmente) */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-700 mb-1">Ciudad</label>
            <input
              type="text"
              placeholder="Ej: Barcelona"
              {...register("ciudad", { required: true })}
              className="w-full bg-zinc-300 text-gray-900 px-4 py-2 rounded-md placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-700 mb-1">Máximo de jugadores</label>
            <input
              type="number"
              {...register("max_jugadores", { required: true, min: 1 })}
              placeholder="10"
              className="w-full bg-zinc-300 text-gray-900 px-4 py-2 rounded-md placeholder-gray-500"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Descripción</label>
          <textarea
            placeholder="Opcional: añade reglas, nivel esperado, etc."
            {...register("descripcion")}
            className="w-full bg-zinc-300 text-gray-900 px-4 py-2 rounded-md placeholder-gray-500"
            rows="4"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          {params.id ? "Actualizar Partido" : "Crear Partido"}
        </button>
      </form>
    </div>
  );
}

export default PartidoFormPage;