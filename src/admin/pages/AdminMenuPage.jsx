// src/admin/pages/AdminMenuPage.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import Loading from "../../components/Loading";

// Drag & Drop
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function AdminMenuPage() {
  const { menuId } = useParams();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTables();
  }, [menuId]);

  async function loadTables() {
    setLoading(true);

    const ref = collection(db, "menus", menuId, "tables");
    const q = query(ref, orderBy("order", "asc"));
    const snap = await getDocs(q);

    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTables(list);

    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Bu tabloyu silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, "menus", menuId, "tables", id));
    loadTables();
  }

  async function handleDragEnd(result) {
    if (!result.destination) return;

    const newList = Array.from(tables);
    const [moved] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, moved);

    // geçici state güncelle
    setTables(newList);

    // Firestore'da order güncelle
    for (let i = 0; i < newList.length; i++) {
      await updateDoc(
        doc(db, "menus", menuId, "tables", newList[i].id),
        { order: i }
      );
    }

    console.log("Yeni sıra kaydedildi!");
  }

  if (loading) return <Loading />;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold capitalize">
        {menuId} menüsü
      </h1>

      <Link
        to={`/admin/${menuId}/new`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Yeni Tablo Ekle
      </Link>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tableList">
          {(provided) => (
            <div
              className="space-y-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tables.map((t, index) => (
                <Draggable
                  key={t.id}
                  draggableId={t.id}
                  index={index}
                >
                  {(drag) => (
                    <div
                      ref={drag.innerRef}
                      {...drag.draggableProps}
                      {...drag.dragHandleProps}
                      className="p-4 bg-white rounded-2xl border shadow flex justify-between items-center cursor-move"
                    >
                      <div>
                        <p className="text-lg font-medium">
                          {t.sheetName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Google Sheet ID: {t.sheetId}
                        </p>
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
