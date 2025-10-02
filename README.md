# 🏀⚽ App de Partidos

Aplicación web para organizar partidos y eventos deportivos.  
Permite a los usuarios crear, editar y gestionar partidos indicando detalles como deporte, lugar, fecha, número de jugadores y descripción.

---

## 🚀 Tecnologías utilizadas
- **Frontend**: React + TailwindCSS  
- **Backend**: Node.js + Express  
- **Base de datos**: MongoDB + Mongoose  
- **Gestión de formularios**: react-hook-form  
- **Rutas**: react-router-dom  

---

## ✨ Funcionalidades principales
- Crear un partido con:
  - Título
  - Deporte
  - Fecha y hora
  - Lugar y ciudad
  - Número mínimo y máximo de jugadores
  - Descripción opcional
- Editar partidos existentes  
- Guardar en base de datos con **Mongoose**  
- Interfaz limpia y responsive con **TailwindCSS**

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/partidos-app.git
   cd partidos-app


Instala las dependencias:
npm install


Configura tus variables de entorno en un archivo .env (ejemplo):
MONGODB_URI=mongodb://localhost:27017/partidos
PORT=4000


Inicia el backend:
cd /backend
npm run server


Inicia el frontend:
cd /frontend
npm run dev






📂 Estructura del proyecto
/backend
  ├── models
  │   └── Partido.js
  ├── routes
  └── server.js
/frontend
  ├── src
  │   ├── components
  │   ├── context
  │   ├── pages
  │   │   └── PartidoFormPage.jsx
  │   └── App.jsx
