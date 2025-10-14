# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

MatchPoint is a sports event organizing web application built with a MERN stack (MongoDB, Express, React, Node.js). It allows users to create, edit, and manage sports matches with details like sport type, venue, date, player limits, and descriptions. The app includes authentication, user management, and a modern responsive interface.

## Architecture

### Monorepo Structure
- **frontend/**: React + Vite application with TailwindCSS
- **backend/**: Node.js + Express API server with MongoDB/Mongoose

### Core Technologies
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT authentication
- **Frontend**: React 19, Vite, TailwindCSS, React Hook Form, React Router DOM
- **Additional**: Google Generative AI integration, Axios for API calls

### Key Components

#### Backend Architecture
- **Models**: User, Partido (Match), Task, SystemInfo - Mongoose schemas
- **Controllers**: Auth, Partidos, Users, Tasks, SystemInfo - business logic
- **Routes**: Modular routing with authentication middleware
- **Middleware**: JWT validation, CORS configuration for multiple origins
- **Authentication**: JWT-based with bcryptjs password hashing

#### Frontend Architecture  
- **Context Providers**: AuthContext, PartidosContext, TasksContext for global state
- **Protected Routes**: Authentication-based route protection
- **Pages**: Login, Register, Home, Partido forms/details, Profile, Premium
- **Layout**: MainLayout wrapper for consistent UI structure
- **API Layer**: Axios-based API client with interceptors

## Development Commands

### Backend Development
```bash
# Start backend in development mode
cd backend
npm run dev

# Start backend in production mode  
npm start
```

### Frontend Development
```bash
# Start frontend development server
cd frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start production server
npm start

# Lint code
npm run lint
```

### Full Application Setup
```bash
# Install all dependencies
npm install  # in root if package.json exists, otherwise:
cd backend && npm install
cd ../frontend && npm install

# Set up environment variables (backend)
# Create backend/.env with:
# MONGODB_URI=mongodb://localhost:27017/matchpoint
# TOKEN_SECRET=your_jwt_secret
# PORT=4000

# Start both services
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev  # Terminal 2
```

## Database Schema

### Core Models
- **User**: username, password, ciudad, avatar, premium status, reputacion
- **Partido**: titulo, deporte, lugar, ciudad, fecha, creador, jugadores[], max_jugadores, estado
- **Task**: General task management (legacy/additional feature)

### Key Relationships
- Partido.creador → User (match creator)
- Partido.jugadores → [User] (participants)

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login  
- `POST /api/logout` - User logout
- `GET /api/verify` - Token verification

### Partidos (Matches)
- `GET /api/partidos` - List all matches
- `POST /api/partidos` - Create match
- `GET /api/partidos/:id` - Get match details  
- `PUT /api/partidos/:id` - Update match
- `DELETE /api/partidos/:id` - Delete match

## Environment Configuration

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/matchpoint
TOKEN_SECRET=Erika_MatchPoint_secret_key  
PORT=4000
FRONTEND_URL=http://localhost:5173
```

### CORS Configuration
Configured for multiple deployment environments:
- Development: http://localhost:5173
- Render: https://matchpoint-v0-frontend.onrender.com
- Vercel: https://match-point-v0-frontend.vercel.app
- Custom domain: https://matchpoint.walid.es

## Development Notes

### Frontend Port
- Default development server runs on port 5173 (Vite)

### Backend Port  
- Default backend server runs on port 4000
- Configured in config.js with process.env.PORT fallback

### Database Connection
- Supports both local MongoDB and MongoDB Atlas
- Connection status logged on startup

### Authentication Flow
- JWT tokens stored in HTTP-only cookies
- Protected routes use validateToken middleware
- Frontend AuthContext manages authentication state

### State Management
- React Context API for global state (Auth, Partidos, Tasks)
- No external state management library (Redux, Zustand) used