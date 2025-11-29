import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import SortableTableList from "../components/SortableTableList";

export default function TablesPage() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const tableRef = ref(db, "tables");
    return onValue(tableRef, (snapshot) => {
      const data = snapshot.val() || {};
      const arr = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .sort((a, b) => a.order - b.order);
      setTables(arr);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Tabloları Sırala</h1>

      <SortableTableList tables={tables} setTables={setTables} />
    </div>
  );
}
