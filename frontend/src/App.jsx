import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TasksContext";
import { PartidoProvider } from "./context/PartidosContext";
import Auth_ProtectedRoute from "./ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import PartidoFormPage from "./pages/PartidoFormPage";
import PartidosPage from "./pages/PartidosPage";
import PremiumPage from "./pages/PremiumPage";
import PartidoDetalle from "./pages/PartidoDetalle";


function App() {
  return (
    <div>
      <AuthProvider>
        <PartidoProvider>
          <TaskProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route element={<Auth_ProtectedRoute />}>

                    <Route path="/crear-partido" element={<PartidoFormPage />} />
                    <Route path="/partidos" element={<PartidosPage />} />
                            <Route path="/partido/:id" element={<PartidoDetalle />} />

                    <Route path="/premium" element={<PremiumPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </BrowserRouter>
          </TaskProvider>
        </PartidoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
