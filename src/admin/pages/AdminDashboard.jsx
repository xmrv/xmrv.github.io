// src/admin/pages/AdminDashboard.jsx
// Admin ana paneli: menü seçimi ve tablo yönetimine giriş

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const menus = [
    { id: "kahvalti", label: "Kahvaltı" },
    { id: "ogle", label: "Öğle" },
    { id: "aksam", label: "Akşam" },
    { id: "brunch", label: "Brunch" },
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Admin Paneli</h1>

      <p className="text-gray-600 mb-4">Düzenlemek istediğiniz menüyü seçin:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menus.map((m) => (
          <Link
            key={m.id}
            to={`/admin/${m.id}`}
            className="p-4 rounded-2xl bg-white shadow hover:shadow-md transition border border-gray-200"
          >
            <p className="text-lg font-medium">{m.label} Menüsü</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
