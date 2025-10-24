import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Tags,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Eye,
  Settings,
  LogOut,
} from "lucide-react";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <aside className="flex flex-col w-64 h-screen text-white shadow-2xl bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-900">
      <div className="flex items-center justify-center h-20 border-b border-blue-700">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-4xl text-white-400">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center w-full px-4 py-2 text-left transition rounded-lg hover:bg-blue-800"
        >
          <LayoutDashboard size={20} className="mr-3 text-cyan-400" />
          Dashboard
        </button>

        <div>
          <button
            onClick={() => toggleMenu("productos")}
            className="flex items-center justify-between w-full px-4 py-2 transition rounded-lg hover:bg-blue-800"
          >
            <div className="flex items-center">
              <Package size={20} className="mr-3 text-cyan-400" />
              Productos
            </div>
            {openMenu === "productos" ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openMenu === "productos" && (
            <div className="mt-1 ml-10 space-y-1 transition-all duration-300 ease-in-out">
              <button
                onClick={() => navigate("/productos/crear")}
                className="flex items-center w-full px-2 py-1 text-sm transition rounded hover:bg-blue-800"
              >
                <PlusCircle size={16} className="mr-2 text-cyan-400" />
                Crear producto
              </button>
              <button
                onClick={() => navigate("/productos")}
                className="flex items-center w-full px-2 py-1 text-sm transition rounded hover:bg-blue-800"
              >
                <Eye size={16} className="mr-2 text-cyan-400" />
                Ver productos
              </button>
            </div>
          )}
        </div>

        <div className="mt-2">
          <button
            onClick={() => toggleMenu("categorias")}
            className="flex items-center justify-between w-full px-4 py-2 transition rounded-lg hover:bg-blue-800"
          >
            <div className="flex items-center">
              <Tags size={20} className="mr-3 text-cyan-400" />
              Categorías
            </div>
            {openMenu === "categorias" ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openMenu === "categorias" && (
            <div className="mt-1 ml-10 space-y-1 transition-all duration-300 ease-in-out">
              <button
                onClick={() => navigate("/categorias/crear")}
                className="flex items-center w-full px-2 py-1 text-sm transition rounded hover:bg-blue-800"
              >
                <PlusCircle size={16} className="mr-2 text-cyan-400" />
                Crear categoría
              </button>
              <button
                onClick={() => navigate("/Category/List")}
                className="flex items-center w-full px-2 py-1 text-sm transition rounded hover:bg-blue-800"
              >
                <Eye size={16} className="mr-2 text-cyan-400" />
                Ver categorías
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button className="flex items-center w-full px-4 py-2 transition rounded-lg hover:bg-blue-800">
          <Settings size={20} className="mr-3 text-cyan-400" />
          Configuración
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 mt-2 transition rounded-lg hover:bg-blue-800"
        >
          <LogOut size={20} className="mr-3 text-red-400" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
