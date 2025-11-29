// src/admin/pages/AdminMenuPage.jsx
// Bir menü altında tablo listesini gösterir (örn: /admin/kahvalti)
// Admin burada tabloları görür, ekler ve siler

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Loading from "../../components/Loading";

export default function AdminMenuPage() {
  const { menuId } = useParams(); // kahvalti / ogle / aksam / brunch
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTables();
  }, [menuId]);

  async function loadTables() {
    setLoading(true);
    const ref = collection(db, "menus", menuId, "tables");
    const snap = await getDocs(ref);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTables(list);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Bu tabloyu silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, "menus", menuId, "tables", id));
    loadTables();
  }

  if (loading) return <Loading />;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold capitalize">{menuId} menüsü</h1>

      <Link
        to={`/admin/${menuId}/new`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Yeni Tablo Ekle
      </Link>

      <div className="space-y-4">
        {tables.length === 0 && (
          <p className="text-gray-500">Bu menüde henüz tablo yok.</p>
        )}

        {tables.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white rounded-2xl border shadow flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">{t.sheetName}</p>
              <p className="text-sm text-gray-500">Google Sheet ID: {t.sheetId}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/admin/${menuId}/edit/${t.id}`}
                className="px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Düzenle
              </Link>

              <button
                onClick={() => handleDelete(t.id)}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
