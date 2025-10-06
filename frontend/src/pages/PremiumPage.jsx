import React from "react";

const PremiumPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 rounded-lg">
      <div className="bg-white max-w-3xl w-full p-10 rounded-2xl shadow-lg border border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Mejora a Premium</h1>
        <p className="text-gray-700 text-lg mb-8">
          Con Premium disfrutarás de una experiencia completa en MatchPoint. Olvídate de anuncios y aprovecha todas las ventajas exclusivas.
        </p>

        {/* Ventajas */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <span className="text-orange-500 text-3xl mb-3">🚫</span>
            <h3 className="font-semibold text-lg mb-1">Sin anuncios</h3>
            <p className="text-gray-600 text-sm">Disfruta de la plataforma sin interrupciones publicitarias.</p>
          </div>

          <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <span className="text-orange-500 text-3xl mb-3">⭐</span>
            <h3 className="font-semibold text-lg mb-1">Acceso prioritario a partidos</h3>
            <p className="text-gray-600 text-sm">Reserva tus partidos antes que los usuarios gratuitos.</p>
          </div>

          <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <span className="text-orange-500 text-3xl mb-3">📈</span>
            <h3 className="font-semibold text-lg mb-1">Estadísticas avanzadas</h3>
            <p className="text-gray-600 text-sm">Obtén análisis completos de tus partidos y rendimiento.</p>
          </div>

          <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <span className="text-orange-500 text-3xl mb-3">💬</span>
            <h3 className="font-semibold text-lg mb-1">Mensajería ilimitada</h3>
            <p className="text-gray-600 text-sm">Chatea con cualquier usuario sin restricciones.</p>
          </div>

          <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow sm:col-span-2">
            <span className="text-orange-500 text-3xl mb-3">🏅</span>
            <h3 className="font-semibold text-lg mb-1">Perfil destacado</h3>
            <p className="text-gray-600 text-sm">Haz que tu perfil se vea primero en las búsquedas de otros usuarios.</p>
          </div>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
          Mejorar a Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumPage;
