// src/App.jsx
import AppRouter from "./Router";
import "./styles/theme.css";

export default function App() {
  return (
    <div className="font-sans bg-[#f5f7fa] min-h-screen text-gray-900">
      <AppRouter />
    </div>
  );
}
