// src/Router.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";

// Menü sayfaları
import Kahvalti from "./pages/Kahvalti";
import Ogle from "./pages/Ogle";
import Aksam from "./pages/Aksam";
import Brunch from "./pages/Brunch";

// Admin paneli
import Admin from "./pages/Admin";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Kullanıcıya açık menü sayfaları */}
        <Route element={<MainLayout />}> 
          <Route path="/" element={<Kahvalti />} />
          <Route path="/kahvalti" element={<Kahvalti />} />
          <Route path="/ogle" element={<Ogle />} />
          <Route path="/aksam" element={<Aksam />} />
          <Route path="/brunch" element={<Brunch />} />
        </Route>

        {/* Admin paneli */}
        <Route element={<AdminLayout />}> 
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
