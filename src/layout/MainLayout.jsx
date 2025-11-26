// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      {/* Üst Menü */}
      <Header />

      {/* Sayfa İçeriği */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
