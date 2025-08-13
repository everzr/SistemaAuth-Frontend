import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // ajusta la ruta si difiere

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}
