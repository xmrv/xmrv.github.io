import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { db } from "../../firebase";
import { ref, update } from "firebase/database";

// --- Bir satır bileşeni (sürüklenebilir)
function SortableRow({ id, name }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-xl shadow mb-3 flex items-center justify-between"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-500 mr-4"
      >
        ⋮⋮
      </div>

      <span className="font-medium">{name}</span>
    </div>
  );
}

// --- Ana Liste
export default function SortableTableList({ tables, setTables }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tables.findIndex((t) => t.id === active.id);
    const newIndex = tables.findIndex((t) => t.id === over.id);

    const newOrder = arrayMove(tables, oldIndex, newIndex);
    setTables(newOrder);

    // Firebase’e sıralama yaz
    const updates = {};
    newOrder.forEach((table, index) => {
      updates[`tables/${table.id}/order`] = index;
    });
    await update(ref(db), updates);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={tables.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tables.map((table) => (
          <SortableRow key={table.id} id={table.id} name={table.name} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
