import { useEffect } from "react";

function ChangelogPage() {
  useEffect(() => {
    document.title = "Changelog - Mi App"; // Opcional: cambia el título de la pestaña
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Changelog
        </h1>
        <p className="text-gray-700 mb-6">
          Aquí puedes ver los cambios y actualizaciones más recientes de la aplicación.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-blue-500">
            <h2 className="font-semibold text-lg text-gray-900">Futuros cambios</h2>
            <p className="text-gray-700 text-sm">- Al crear un partido estas dentro automaticamente.</p>
            <p className="text-gray-700 text-sm">- Se pueden editar y borrar partidos (solo si eres el creador).</p>
            <p className="text-gray-700 text-sm">- Ver los puntos en el perfil.</p>
            <p className="text-gray-700 text-sm">- Mejorar sistema de reputacion (actualmente no funciona del todo).</p>
            <p className="text-gray-700 text-sm">- Mejorar sistema de usuarios premium (actualmente no funciona del todo).</p>
            <p className="text-gray-700 text-sm">- Poder ver una especie de podio o top de jugadores con mas puntos.</p>
            <p className="text-gray-700 text-sm">- Perfil de usuario con posibilidad de cambiar username y password.</p>
            <p className="text-gray-700 text-sm">- Footer con links a redes sociales y demas.</p>
            <p className="text-gray-700 text-sm">- Mejorar diseño de la aplicacion (colores, fuentes, etc.).</p>
            <p className="text-gray-700 text-sm">- Añadir un sistema de mensajes de informacion para el usuario.</p>
            <p className="text-gray-700 text-sm">- Añadir un sistema de notificaciones (para cuando alguien se une a un partido que has creado, etc.).</p>
            <p className="text-gray-700 text-sm">- Añadir un sistema de valoraciones y comentarios para los partidos y usuarios.</p>
            <p className="text-gray-700 text-sm">- Añadir mas filtros a la hora de buscar partidos (nivel, genero, etc.).</p>
            <ul>
              <li className="text-gray-700 text-sm">- Añadir mas deportes:</li>
              {/* Lista de deportes a añadir */}
              <li className="text-gray-700 text-sm">- Fútbol / Fútbol sala.</li>
              <li className="text-gray-700 text-sm">- Baloncesto.</li>
              <li className="text-gray-700 text-sm">- Vóley / Vóley playa.</li>
              <li className="text-gray-700 text-sm">- Balonmano.</li>
              <li className="text-gray-700 text-sm">- Béisbol.</li>
              <li className="text-gray-700 text-sm">- Hockey sala.</li>
              <li className="text-gray-700 text-sm">- Bádminton.</li>
              <li className="text-gray-700 text-sm">- Ping pong.</li>
              <li className="text-gray-700 text-sm">- Squash.</li>
              <li className="text-gray-700 text-sm">- Calistenia / Street workout.</li>
              <li className="text-gray-700 text-sm">- Entrenamientos funcionales en grupo.</li>
              <li className="text-gray-700 text-sm">- Petanca.</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-blue-500">
            <h2 className="font-semibold text-lg text-gray-900">v1.2.0 14/10/2025</h2>
            <p className="text-gray-700 text-sm">- Se muestra la lista de partidos creados por el usuario en su perfil.</p>
            <p className="text-gray-700 text-sm">- Página de changelog (la que estás viendo ahora mismo).</p>

          </div>

          <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green-500">
            <h2 className="font-semibold text-lg text-gray-900">v1.1.0 8/10/2025</h2>
            <h3 className="text-gray-800">Aplicacion ya funcional con solamente las funciones basicas.</h3>
            <p className="text-gray-700 text-sm">- Registro e inicio de sesion correctos.</p>
            <p className="text-gray-700 text-sm">- Foro estatico.</p>
            <p className="text-gray-700 text-sm">- Se pueden crear partidos.</p>
            <p className="text-gray-700 text-sm">- Se pueden ver esos partidos creados.</p>
            <p className="text-gray-700 text-sm">- Implementados unos filtros (deporte, fecha y ciudad) funcionales.</p>
            <p className="text-gray-700 text-sm">- Se pueden unir y salir de partidos.</p>
            <p className="text-gray-700 text-sm">- Sistema de reputacion basico (aun no funcional del todo).</p>
            <p className="text-gray-700 text-sm">- Sistema de usuarios premium (aun no funcional del todo).</p>
            <p className="text-gray-700 text-sm">- Navbar con links a las paginas principales.</p>
            <p className="text-gray-700 text-sm">- Página de inicio con informacion basica.</p>
            <p className="text-gray-700 text-sm">- Página de premium con informacion basica.</p>


            

          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangelogPage;
