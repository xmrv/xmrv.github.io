// src/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[#eef1f5]">
      {/* Sol Panel */}
      <aside className="w-64 bg-white shadow-md p-6 border-r border-gray-200 hidden md:flex flex-col">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <a href="/admin" className="hover:text-blue-600">Tablolar</a>
          <a href="#" className="hover:text-blue-600">Kullanıcı Ayarları</a>
          <a href="#" className="hover:text-blue-600">Tema</a>
        </nav>
      </aside>

      {/* Sağ İçerik Alanı */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-6 md:p-8 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
