// src/admin/pages/EditTable.jsx
// Bir tablonun Sheet ID ve Sheet Name bilgilerini düzenleme sayfası

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Loading from "../../components/Loading";

export default function EditTable() {
  const { menuId, tableId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sheetId, setSheetId] = useState("");
  const [sheetName, setSheetName] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const ref = doc(db, "menus", menuId, "tables", tableId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const d = snap.data();
      setSheetId(d.sheetId || "");
      setSheetName(d.sheetName || "");
    }

    setLoading(false);
  }

  async function handleSave(e) {
    e.preventDefault();

    const ref = doc(db, "menus", menuId, "tables", tableId);
    await updateDoc(ref, {
      sheetId,
      sheetName,
    });

    alert("Tablo güncellendi!");
    navigate(`/admin/${menuId}`);
  }

  if (loading) return <Loading />;

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Tabloyu Düzenle</h1>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Google Sheet ID</label>
          <input
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sheet Adı</label>
          <input
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}
