// src/admin/AdminApp.jsx

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import AdminKahvalti from "./pages/AdminKahvalti";
import AdminBrunch from "./pages/AdminBrunch";
import AdminOgle from "./pages/AdminOgle";
import AdminAksam from "./pages/AdminAksam";
import YeniTabloEkle from "./pages/YeniTabloEkle";

export default function AdminApp() {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* SOL MENÜ */}
        <aside className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

          <nav className="space-y-2">
            <Link className="block hover:text-yellow-300" to="/admin">Dashboard</Link>
            <Link className="block hover:text-yellow-300" to="/admin/kahvalti">Kahvaltı</Link>
            <Link className="block hover:text-yellow-300" to="/admin/brunch">Brunch</Link>
            <Link className="block hover:text-yellow-300" to="/admin/ogle">Öğle</Link>
            <Link className="block hover:text-yellow-300" to="/admin/aksam">Akşam</Link>

            <hr className="border-gray-500" />

            <Link className="block hover:text-yellow-300" to="/admin/yeni-tablo">Yeni Tablo Ekle</Link>
          </nav>
        </aside>

        {/* SAYFA İÇERİĞİ */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/kahvalti" element={<AdminKahvalti />} />
            <Route path="/admin/brunch" element={<AdminBrunch />} />
            <Route path="/admin/ogle" element={<AdminOgle />} />
            <Route path="/admin/aksam" element={<AdminAksam />} />

            <Route path="/admin/yeni-tablo" element={<YeniTabloEkle />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
