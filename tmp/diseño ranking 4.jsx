import React from "react";

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

  // Mejora: Estilo de tarjeta para el podio con sombra y colores ajustados para 'clean' look
  const getPositionStyle = (index) => {
    if (index === 0) return 'border-yellow-500 bg-yellow-50 shadow-lg';
    if (index === 1) return 'border-gray-400 bg-gray-100 shadow-md';
    if (index === 2) return 'border-orange-500 bg-orange-50 shadow-md';
    return 'border-gray-200 bg-white shadow-sm';
  };

  // Color de Reputación
  const getReputationColor = (reputacion) => {
    if (reputacion >= 90) return 'text-green-500'; // Ligeramente más vivo
    if (reputacion >= 80) return 'text-blue-500';
    return 'text-orange-500';
  };
  
  // Clase para el badge de posición
  const getPositionBadgeClass = (index) => {
    if (index === 0) return 'bg-yellow-500 text-white shadow-lg';
    if (index === 1) return 'bg-gray-500 text-white shadow-md';
    if (index === 2) return 'bg-orange-500 text-white shadow-md';
    return 'bg-gray-200 text-gray-700'; // Más claro para el resto
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen bg-gray-50">
      
      {/* Título Moderno con Degradado */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
        🏆 Ranking de Jugadores
      </h1>
      <p className="text-gray-600 mb-8 text-sm sm:text-base border-b pb-4">
        Aquí podrás ver el ranking de los jugadores según su reputación, puntos y partidos jugados.
      </p>

      {/* --- Encabezado de la "Tabla" Responsive --- */}
      {/* Oculto en móvil (sm:hidden) para un look más limpio, visible en tablet/desktop */}
      <div className="hidden sm:grid grid-cols-5 gap-4 font-semibold text-gray-700 border-b-2 border-gray-300 pb-3 mb-3 text-sm">
        <span className="text-center">#</span>
        <span>Jugador</span>
        <span className="text-right">Reputación</span>
        <span className="text-right">Partidos</span>
        <span className="text-right">Puntos</span>
      </div>

      {/* --- Lista de Ranking con Estilo de Tarjetas Clean/Moderno --- */}
      <div className="space-y-3">
        {jugadores.map((jugador, index) => (
          <div
            key={jugador.username}
            // Responsive: usa 5 columnas. Padding/border-l-4 para un look más moderno.
            className={`grid grid-cols-5 items-center p-3 sm:p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${getPositionStyle(index)}`}
          >
            
            {/* 1. Posición */}
            <span
              className={`font-black text-sm sm:text-lg text-center rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mx-auto ${getPositionBadgeClass(index)}`}
            >
              {index + 1}
            </span>

            {/* 2. Jugador + Premium (Responsive: usa flex-col para móvil y flex-row para desktop para apilar/alinear) */}
            <div className="col-span-1 flex flex-col sm:flex-row sm:items-center space-y-0 sm:space-x-2 min-w-0">
              <span className="font-bold text-gray-800 text-sm sm:text-base truncate">
                {jugador.username}
              </span>
              {jugador.premium && (
                <span className="text-[10px] font-extrabold text-white bg-blue-500 rounded-full px-1.5 py-0.5 w-fit">
                  PREMIUM
                </span>
              )}
            </div>

            {/* 3. Reputación (Responsive: Muestra etiqueta debajo en móvil) */}
            <div className="flex flex-col items-end sm:items-end">
              <span className={`text-sm sm:text-base font-extrabold ${getReputationColor(jugador.reputacion)}`}>
                {jugador.reputacion}
              </span>
              <span className="text-[10px] text-gray-500 sm:hidden">Reput.</span>
            </div>
            

            {/* 4. Partidos (Responsive: Muestra etiqueta debajo en móvil) */}
            <div className="flex flex-col items-end sm:items-end">
              <span className="text-sm sm:text-base text-gray-600 font-bold">
                {jugador.partidos}
              </span>
              <span className="text-[10px] text-gray-500 sm:hidden">Part.</span>
            </div>

            {/* 5. Puntos (Destacado y Responsive: Muestra etiqueta debajo en móvil) */}
            <div className="flex flex-col items-end sm:items-end">
              <span className="text-base sm:text-lg font-extrabold text-orange-600">
                {jugador.puntos}
              </span>
              <span className="text-[10px] text-gray-500 sm:hidden">Puntos</span>
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