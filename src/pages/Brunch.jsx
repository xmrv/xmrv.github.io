// src/pages/Brunch.jsx
// Bu sayfa: Firestore'dan tablo listesini alır, Google Sheets'ten veriyi okur ve ekrana tabloları basar.

import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getSheetData } from "../utils/googleSheets";
import TableCard from "../components/TableCard";
import Loading from "../components/Loading";

export default function Brunch() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    loadTables();
  }, []);

  async function loadTables() {
    setLoading(true);

    // Firestore'dan kayıtlı tabloları al
    const ref = collection(db, "menus", "brunch", "tables");
    const snap = await getDocs(ref);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTables(list);

    // Google Sheets verilerini çek
    const results = [];
    for (const t of list) {
      const sheetData = await getSheetData(t.sheetId, t.sheetName);
      results.push({ id: t.id, name: t.sheetName, rows: sheetData });
    }

    setDataSets(results);
    setLoading(false);
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Brunch Menüsü</h2>

      {dataSets.length === 0 && (
        <p className="text-gray-500">Bu menüde henüz tablo bulunmuyor.</p>
      )}

      {dataSets.map((t) => (
        <TableCard key={t.id} title={t.name} rows={t.rows} />
      ))}
    </div>
  );
}
