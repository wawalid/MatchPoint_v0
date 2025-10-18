import React from "react";

const PremiumPage = () => {
  return (
    // Contenedor principal: color de fondo y centrado
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8 sm:py-16">
      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          🚀 MatchPoint Premium
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl mx-auto">
          Desbloquea una experiencia de juego superior. Olvídate de anuncios y
          aprovecha todas las ventajas exclusivas para organizar o unirte a
          partidos.
        </p>

        {/* CONTENEDOR DE DOS COLUMNAS (Stacked en móvil, Two-Column en desktop) */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* COLUMNA IZQUIERDA: Precio y Call to Action */}
          <div className="w-full md:w-1/3 bg-white p-8 rounded-2xl shadow-xl border border-orange-200 sticky top-4 self-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b pb-4">
              Plan <span className="text-orange-600">Premium</span>
            </h2>

            <div className="my-6">
              <span className="text-5xl font-extrabold text-orange-500">
                5.99€
              </span>
              <span className="text-xl font-medium text-gray-600"> / mes</span>
            </div>

            <ul className="text-gray-700 text-sm space-y-3 mb-8 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Cancelación en cualquier momento
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Sin compromiso de permanencia
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Pago seguro
              </li>
            </ul>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl">
              ¡Quiero ser Premium!
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Prueba 7 días gratis (solo para nuevos suscriptores).
            </p>
          </div>

          {/* COLUMNA DERECHA: Lista de Ventajas */}
          <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
              Ventajas Exclusivas
            </h2>
            
            {/* Ventajas - Ahora con 2 columnas en móvil y 3 en tablet/desktop */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-500 text-3xl mb-2">🚫</span>
                <h3 className="text-orange-500 font-semibold text-base mb-1">Sin anuncios</h3>
                <p className="text-gray-600 text-xs">Disfruta de la plataforma sin interrupciones publicitarias.</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-500 text-3xl mb-2">⭐</span>
                <h3 className="text-orange-500 font-semibold text-base mb-1">Prioridad en reservas</h3>
                <p className="text-gray-600 text-xs">Asegura tu plaza en partidos populares antes que nadie.</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-500 text-3xl mb-2">📈</span>
                <h3 className="text-orange-500 font-semibold text-base mb-1">Lorem</h3>
                <p className="text-gray-600 text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam odio reprehenderit doloribus harum eum animi aliquam quo itaque iusto debitis.</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-500 text-3xl mb-2">💬</span>
                <h3 className="text-orange-500 font-semibold text-base mb-1">Mensajería ilimitada</h3>
                <p className="text-gray-600 text-xs">Chatea sin restricciones con cualquier usuario de la comunidad.</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-500 text-3xl mb-2">🏅</span>
                <h3 className="text-orange-500 font-semibold text-base mb-1">Perfil destacado</h3>
                <p className="text-gray-600 text-xs">Tu perfil se verá primero en las búsquedas de otros jugadores.</p>
              </div>
              
              <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-500 text-3xl mb-2">🏷️</span>
                <h3 className="text-orange-500 font-semibold text-base mb-1">Etiqueta Premium</h3>
                <p className="text-gray-600 text-xs">Una insignia exclusiva para distinguirte en la plataforma.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;