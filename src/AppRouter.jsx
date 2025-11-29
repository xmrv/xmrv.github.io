// src/AppRouter.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Kahvalti from "./pages/Kahvalti";
import Ogle from "./pages/Ogle";
import Aksam from "./pages/Aksam";
import Brunch from "./pages/Brunch";

import AdminApp from "./admin/AdminApp";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kullanıcı tarafı */}
        <Route path="/" element={<Kahvalti />} />
        <Route path="/kahvalti" element={<Kahvalti />} />
        <Route path="/ogle" element={<Ogle />} />
        <Route path="/aksam" element={<Aksam />} />
        <Route path="/brunch" element={<Brunch />} />

        {/* Admin paneli */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}
