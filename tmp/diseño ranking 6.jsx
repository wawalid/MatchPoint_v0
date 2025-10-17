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
    if (index === 0) return 'bg-yellow-100 border-yellow-400';
    if (index === 1) return 'bg-gray-100 border-gray-400';
    if (index === 2) return 'bg-orange-100 border-orange-400';
    return 'bg-white border-gray-200';
  };

  const getReputationColor = (reputacion) => {
    if (reputacion >= 90) return 'text-green-600';
    if (reputacion >= 80) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-orange-500 text-center sm:text-left">
        Ranking de Jugadores
      </h1>
      <p className="text-gray-700 mb-8 text-center sm:text-left">
        Aquí podrás ver el ranking de los jugadores según su reputación, puntos y partidos jugados.
      </p>

      <div className="space-y-4">
        {jugadores.map((jugador, index) => (
          <div
            key={jugador.username}
            className={`border rounded-xl p-4 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between transition-shadow duration-300 hover:shadow-lg ${getPositionStyle(index)}`}
          >
            {/* Posición */}
            <div className="flex items-center mb-2 sm:mb-0">
              <span
                className={`w-10 h-10 flex items-center justify-center font-bold rounded-full mr-4 ${
                  index === 0
                    ? 'bg-yellow-500 text-white'
                    : index === 1
                    ? 'bg-gray-500 text-white'
                    : index === 2
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </span>

              {/* Nombre + PREMIUM */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{jugador.username}</span>
                {jugador.premium && (
                  <span className="text-xs font-bold text-white bg-blue-500 rounded-full px-2 py-0.5">
                    PREMIUM
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 text-center sm:text-right gap-2 sm:gap-4">
              <div>
                <span className={`font-bold ${getReputationColor(jugador.reputacion)}`}>
                  {jugador.reputacion}
                </span>
                <p className="text-xs text-gray-500">Reputación</p>
              </div>
              <div>
                <span className="font-semibold text-gray-800">{jugador.partidos}</span>
                <p className="text-xs text-gray-500">Partidos</p>
              </div>
              <div>
                <span className="font-semibold text-orange-500">{jugador.puntos}</span>
                <p className="text-xs text-gray-500">Puntos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        *El ranking se actualiza automáticamente cada semana.
      </p>
    </div>
  );
}

export default RankingPage;
