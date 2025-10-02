import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <main className="w-full px-4 md:px-10 py-2 bg-zinc-300 min-h-screen">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default MainLayout;
