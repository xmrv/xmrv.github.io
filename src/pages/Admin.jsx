// src/pages/Admin.jsx
// Basit Admin Paneli – Google Login + Menü Seçimi + Tablo Yönetimi

import { useEffect, useState } from "react";
import { signInWithGoogle, signOutUser, onAuthStateChangedListener } from "../firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("kahvalti");
  const [tables, setTables] = useState([]);
  const [sheetId, setSheetId] = useState("");
  const [sheetName, setSheetName] = useState("");

  // Kullanıcı giriş kontrolü
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Firestore'dan tablo listesini çek
  useEffect(() => {
    if (!user) return;
    loadTables();
  }, [user, selectedMenu]);

  async function loadTables() {
    const ref = collection(db, "menus", selectedMenu, "tables");
    const snap = await getDocs(ref);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTables(list);
  }

  // Yeni tablo ekle
  async function addTable() {
    if (!sheetId || !sheetName) return;

    const ref = collection(db, "menus", selectedMenu, "tables");
    await addDoc(ref, {
      sheetId,
      sheetName,
      createdAt: Date.now(),
    });

    setSheetId("");
    setSheetName("");
    loadTables();
  }

  // Tablo sil
  async function removeTable(id) {
    await deleteDoc(doc(db, "menus", selectedMenu, "tables", id));
    loadTables();
  }

  // --- Giriş Yapılmamışsa ---
  if (!user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
        <p className="mb-6 text-gray-600">Devam etmek için Google hesabınla giriş yap.</p>
        <button
          onClick={signInWithGoogle}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Google ile Giriş Yap
        </button>
      </div>
    );
  }

  // --- Giriş Yapılmışsa ---
  return (
    <div className="space-y-8">
      {/* Üst Bilgiler */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          <p className="text-gray-600">Hoş geldin, {user.displayName}</p>
        </div>

        <button
          onClick={signOutUser}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>

      {/* Menü Seçici */}
      <div className="flex gap-4">
        {[
          { id: "kahvalti", label: "Kahvaltı" },
          { id: "ogle", label: "Öğle" },
          { id: "aksam", label: "Akşam" },
          { id: "brunch", label: "Brunch" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMenu(m.id)}
            className={`px-4 py-2 rounded-lg border shadow-sm ${
              selectedMenu === m.id
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Tablo Ekle Alanı */}
      <div className="bg-gray-50 p-4 rounded-xl border space-y-4">
        <h3 className="text-lg font-semibold">Yeni Tablo Ekle</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Google Sheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Sheet Adı (örn: MENÜ1)"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />

          <button
            onClick={addTable}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Ekle
          </button>
        </div>
      </div>

      {/* Mevcut Tablolar */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Bu Menüdeki Tablolar</h3>

        {tables.length === 0 && (
          <p className="text-gray-500">Bu menüde henüz tablo eklenmemiş.</p>
        )}

        <ul className="space-y-3">
          {tables.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div>
                <p className="font-medium">{t.sheetName}</p>
                <p className="text-gray-500 text-sm">{t.sheetId}</p>
              </div>

              <button
                onClick={() => removeTable(t.id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
