// src/components/Header.jsx
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Sol Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo-left.png" alt="Left Logo" className="h-10 w-auto" />
          <h1 className="text-xl font-semibold tracking-wide">BST Menü</h1>
        </div>

        {/* Sayfa Linkleri */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <NavLink
            to="/kahvalti"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Kahvaltı
          </NavLink>

          <NavLink
            to="/ogle"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Öğle
          </NavLink>

          <NavLink
            to="/aksam"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Akşam
          </NavLink>

          <NavLink
            to="/brunch"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Brunch
          </NavLink>
        </nav>

        {/* Sağ Logo */}
        <div>
          <img src="/logo-right.png" alt="Right Logo" className="h-10 w-auto" />
        </div>
      </div>
    </header>
  );
}
