import React from 'react';

function RankingPage() {
  const jugadores = [
    { username: "Carlos23", puntos: 1200, reputacion: 98, partidos: 45, premium: true },
    { username: "MartaFit", puntos: 1100, reputacion: 95, partidos: 42, premium: true },
    { username: "WalidPower", puntos: 1050, reputacion: 92, partidos: 40, premium: false },
    { username: "JaviPro", puntos: 980, reputacion: 89, partidos: 38, premium: true },
    { username: "Lau_10", puntos: 940, reputacion: 86, partidos: 36, premium: false },
    { username: "Marcelo", puntos: 900, reputacion: 83, partidos: 35, premium: false },
    { username: "AnaSport", puntos: 870, reputacion: 80, partidos: 33, premium: true },
    { username: "NicoTeam", puntos: 820, reputacion: 77, partidos: 31, premium: false },
    { username: "SaraGym", puntos: 790, reputacion: 74, partidos: 29, premium: false },
    { username: "DaniRun", puntos: 750, reputacion: 71, partidos: 28, premium: false },
  ];

  const getPositionStyle = (index) => {
    if (index === 0) return 'border-yellow-400 bg-yellow-50';
    if (index === 1) return 'border-gray-400 bg-gray-50';
    if (index === 2) return 'border-orange-400 bg-orange-50';
    return 'border-gray-200 bg-white';
  };

  const getReputationColor = (reputacion) => {
    if (reputacion >= 90) return 'text-green-600';
    if (reputacion >= 80) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-orange-500">
          Ranking de Jugadores
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Aquí podrás ver el ranking de los jugadores según su reputación, puntos y partidos jugados.
        </p>

        {/* Encabezado de tabla - Solo desktop */}
        <div className="hidden sm:grid grid-cols-5 gap-4 font-semibold text-gray-700 border-b-2 border-gray-300 pb-3 mb-4 text-sm">
          <span className="text-center">Posición</span>
          <span>Jugador</span>
          <span className="text-right">Reputación</span>
          <span className="text-right">Partidos</span>
          <span className="text-right">Puntos</span>
        </div>

        {/* Lista de Ranking */}
        <div className="space-y-3 mb-8">
          {jugadores.map((jugador, index) => (
            <div
              key={jugador.username}
              className={`grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 items-center p-4 rounded-xl border-2 ${getPositionStyle(index)} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              {/* Vista Mobile: Fila superior con posición, nombre y premium */}
              <div className="flex items-center gap-3 sm:contents">
                {/* Posición */}
                <span
                  className={`font-black text-lg rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 shadow-sm ${
                    index === 0
                      ? 'bg-yellow-500 text-white'
                      : index === 1
                      ? 'bg-gray-500 text-white'
                      : index === 2
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  } sm:mx-auto`}
                >
                  {index + 1}
                </span>

                {/* Jugador + Premium */}
                <div className="flex items-center gap-2 flex-1 sm:flex-none">
                  <span className="font-bold text-gray-800 text-base sm:text-sm truncate">
                    {jugador.username}
                  </span>
                  {jugador.premium && (
                    <span className="text-xs font-bold text-white bg-blue-500 rounded-full px-2 py-0.5 whitespace-nowrap">
                      PREMIUM
                    </span>
                  )}
                </div>
              </div>

              {/* Vista Mobile: Fila inferior con stats */}
              <div className="grid grid-cols-3 gap-2 text-center sm:contents">
                {/* Reputación */}
                <div className="sm:text-right">
                  <span className="block sm:hidden text-xs text-gray-500 mb-1">Reputación</span>
                  <span className={`font-bold text-lg sm:text-base ${getReputationColor(jugador.reputacion)}`}>
                    {jugador.reputacion}
                  </span>
                </div>

                {/* Partidos */}
                <div className="sm:text-right">
                  <span className="block sm:hidden text-xs text-gray-500 mb-1">Partidos</span>
                  <span className="text-gray-700 font-semibold text-lg sm:text-base">
                    {jugador.partidos}
                  </span>
                </div>

                {/* Puntos */}
                <div className="sm:text-right">
                  <span className="block sm:hidden text-xs text-gray-500 mb-1">Puntos</span>
                  <span className="text-orange-500 font-bold text-lg sm:text-base">
                    {jugador.puntos}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center">
          *El ranking se actualiza automáticamente cada semana.
        </p>
      </div>
    </div>
  );
}

export default RankingPage;