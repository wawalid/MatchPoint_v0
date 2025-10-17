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
    return 'border-gray-200';
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

      {/* Encabezado de tabla (oculto en móviles) */}
      <div className="hidden sm:grid grid-cols-5 font-semibold text-gray-700 border-b pb-2 mb-2 text-sm sm:text-base">
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
            className={`grid sm:grid-cols-5 items-center p-4 rounded-xl border ${getPositionStyle(index)} transition-all duration-300 hover:shadow-md`}
          >
            {/* Posición */}
            <span
              className={`font-bold text-center rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 sm:mb-0 ${
                index === 0
                  ? 'bg-yellow-500 text-white'
                  : index === 1
                  ? 'bg-gray-500 text-white'
                  : index === 2
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}
            </span>

            {/* Jugador + Premium */}
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2 sm:mb-0">
              <span className="font-semibold text-gray-800">{jugador.username}</span>
              {jugador.premium && (
                <span className="text-xs font-bold text-white bg-blue-500 rounded-full px-2 py-0.5">
                  PREMIUM
                </span>
              )}
            </div>

            {/* Reputación */}
            <span className={`text-right font-bold ${getReputationColor(jugador.reputacion)} mb-2 sm:mb-0`}>
              {jugador.reputacion}
            </span>

            {/* Partidos */}
            <span className="text-right text-gray-600 font-medium mb-2 sm:mb-0">
              {jugador.partidos}
            </span>

            {/* Puntos */}
            <span className="text-right text-orange-500 font-semibold mb-2 sm:mb-0">
              {jugador.puntos}
            </span>
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
