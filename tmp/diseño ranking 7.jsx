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
    if (index === 0) return 'border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white';
    if (index === 1) return 'border-l-4 border-l-gray-400 bg-gradient-to-r from-gray-50 to-white';
    if (index === 2) return 'border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white';
    return 'border-l-4 border-l-transparent bg-white';
  };

  const getMedalIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return null;
  };

  const getReputationColor = (reputacion) => {
    if (reputacion >= 90) return 'text-green-600 bg-green-50';
    if (reputacion >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
            🏆 Ranking de Jugadores
          </h1>
          <p className="text-gray-600">
            Los mejores jugadores según reputación, puntos y partidos jugados.
          </p>
        </div>

        {/* Desktop: Table Header */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-3 mb-2 text-sm font-bold text-gray-600 uppercase tracking-wide">
          <span className="col-span-1">#</span>
          <span className="col-span-2">Jugador</span>
          <span className="text-center">Reputación</span>
          <span className="text-center">Partidos</span>
          <span className="text-center">Puntos</span>
        </div>

        {/* Ranking List */}
        <div className="space-y-3">
          {jugadores.map((jugador, index) => (
            <div
              key={jugador.username}
              className={`${getPositionStyle(index)} rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5`}
            >
              {/* Mobile & Tablet Layout */}
              <div className="lg:hidden">
                <div className="flex items-start justify-between mb-3">
                  {/* Left: Position + Name */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-700 flex-shrink-0">
                      {getMedalIcon(index) || index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-lg">
                          {jugador.username}
                        </span>
                        {jugador.premium && (
                          <span className="px-2 py-0.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                            PRO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Reputación</div>
                    <div className={`inline-block px-3 py-1.5 rounded-lg font-bold ${getReputationColor(jugador.reputacion)}`}>
                      {jugador.reputacion}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Partidos</div>
                    <div className="text-xl font-bold text-gray-700">
                      {jugador.partidos}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Puntos</div>
                    <div className="text-xl font-bold text-orange-500">
                      {jugador.puntos}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
                {/* Position */}
                <div className="flex items-center justify-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-700">
                    {getMedalIcon(index) || index + 1}
                  </div>
                </div>

                {/* Player Name */}
                <div className="col-span-2 flex items-center gap-2">
                  <span className="font-bold text-gray-800 text-lg">
                    {jugador.username}
                  </span>
                  {jugador.premium && (
                    <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                      PRO
                    </span>
                  )}
                </div>

                {/* Reputation */}
                <div className="text-center">
                  <span className={`inline-block px-3 py-1.5 rounded-lg font-bold ${getReputationColor(jugador.reputacion)}`}>
                    {jugador.reputacion}
                  </span>
                </div>

                {/* Matches */}
                <div className="text-center text-xl font-bold text-gray-700">
                  {jugador.partidos}
                </div>

                {/* Points */}
                <div className="text-center text-xl font-bold text-orange-500">
                  {jugador.puntos}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          ⏱️ El ranking se actualiza automáticamente cada semana
        </p>
      </div>
    </div>
  );
}

export default RankingPage;