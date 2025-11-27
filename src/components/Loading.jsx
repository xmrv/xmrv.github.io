// src/components/Loading.jsx
// Basit, modern bir loading animasyonu

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
    </div>
  );
}
