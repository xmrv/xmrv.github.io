// src/pages/admin/AdminPanel.jsx
// Admin paneli: Menüleri yönetme, tablo ekleme, silme, sürükle-bırak sıralama

import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../../auth/useAuth";

export default function AdminPanel() {
  const { user } = useAuth();

  const [menus] = useState(["kahvalti", "ogle", "aksam", "brunch"]);
  const [activeMenu, setActiveMenu] = useState("kahvalti");
  const [tables, setTables] = useState([]);

  useEffect(() => {
    loadTables(activeMenu);
  }, [activeMenu]);

  async function loadTables(menu) {
    const ref = collection(db, "menus", menu, "tables");
    const snap = await getDocs(ref);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTables(list.sort((a, b) => a.order - b.order));
  }

  async function addTable() {
    const sheetId = prompt("Google Sheet ID gir:");
    const sheetName = prompt("Sheet Adını gir:");

    if (!sheetId || !sheetName) return;

    await addDoc(collection(db, "menus", activeMenu, "tables"), {
      sheetId,
      sheetName,
      order: tables.length,
    });

    loadTables(activeMenu);
  }

  async function removeTable(id) {
    await deleteDoc(doc(db, "menus", activeMenu, "tables", id));
    loadTables(activeMenu);
  }

  async function updateOrder(newOrder) {
    setTables(newOrder);

    for (let i = 0; i < newOrder.length; i++) {
      const t = newOrder[i];
      await updateDoc(doc(db, "menus", activeMenu, "tables", t.id), {
        order: i,
      });
    }
  }

  if (!user)
    return <p className="p-4 text-red-600">Bu sayfaya yalnızca admin erişebilir.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Paneli</h1>

      {/* Menü seçimi */}
      <div className="flex gap-4">
        {menus.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMenu(m)}
            className={`px-4 py-2 rounded-lg border ${
              activeMenu === m ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tablo ekleme */}
      <button
        onClick={addTable}
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
      >
        + Tablo Ekle
      </button>

      {/* Drag & Drop tablo listesi */}
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          const items = Array.from(tables);
          const [reordered] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reordered);
          updateOrder(items);
        }}
      >
        <Droppable droppableId="tableList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3 mt-6"
            >
              {tables.map((t, index) => (
                <Draggable key={t.id} draggableId={t.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-lg">{t.sheetName}</p>
                        <p className="text-gray-500 text-sm">Sheet ID: {t.sheetId}</p>
                      </div>

                      <button
                        onClick={() => removeTable(t.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                      >
                        Sil
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
