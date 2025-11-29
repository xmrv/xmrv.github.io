// src/admin/AdminApp.jsx

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import AdminMenuPage from "./pages/AdminMenuPage";
import YeniTabloEkle from "./pages/YeniTabloEkle";

export default function AdminApp() {
  return (
    <div className="flex min-h-screen">
      {/* SOL MENÜ */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        <nav className="space-y-2">
          <Link className="block hover:text-yellow-300" to="/admin">Dashboard</Link>

          <hr className="border-gray-600" />

          <Link className="block hover:text-yellow-300 capitalize" to="/admin/kahvalti">Kahvaltı</Link>
          <Link className="block hover:text-yellow-300 capitalize" to="/admin/ogle">Öğle</Link>
          <Link className="block hover:text-yellow-300 capitalize" to="/admin/aksam">Akşam</Link>
          <Link className="block hover:text-yellow-300 capitalize" to="/admin/brunch">Brunch</Link>

          <hr className="border-gray-600" />

          {/* Admin özel buton */}
          <Link className="block hover:text-yellow-300" to="/admin/kahvalti/new">Yeni Tablo Ekle</Link>
        </nav>
      </aside>

      {/* ANA İÇERİK */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<AdminDashboard />} />

          {/* Dinamik menü yolları */}
          <Route path=":menuId" element={<AdminMenuPage />} />
          <Route path=":menuId/new" element={<YeniTabloEkle />} />

          {/* Düzenleme sayfası — bir sonraki adımda oluşturacağız */}
          <Route path=":menuId/edit/:tableId" element={<div>Düzenleme sayfası (yakında)</div>} />
        </Routes>
      </main>
    </div>
  );
}
