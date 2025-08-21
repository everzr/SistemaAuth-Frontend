// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import LoginPage from "./pages/Login/Login";
import FaceAuth from "./components/FaceAuth";
import LoginFace from "./components/LoginFace";
import RegisterFace from "./components/RegisterFace";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Settings from "./pages/Ajustes/settings";
import Proof from "./pages/proof/proof";
import PostDetail from "./pages/PostDetails";
import CategoryList from "./pages/CategoryList/CategoryList";
import TagList from "./pages/TagList/TagList";
import StaticPage from "./pages/StaticPage";

import AppLayout from "./components/Layout/AppLayout";
import SecretPage from "./pages/Secret/SecretPage";
import VoicePage from "./pages/VoicePage"; // 👈 NUEVO

// Listener global del “código secreto”
import SecretHotKey from "./components/SecretHotKey";

export default function App() {
  return (
    <BrowserRouter>
      <SecretHotKey />
      <Routes>
        {/* Páginas sin navbar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/secret" element={<SecretPage />} />
        <Route path="/voice" element={<VoicePage />} /> {/* 👈 NUEVO */}
        <Route path="/login-face" element={<LoginFace />} />
        <Route path="/register" element={<Register />} />
        
        {/* Páginas con navbar */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/face" element={<FaceAuth />} />
          <Route path="/register-face" element={<RegisterFace />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/categorias" element={<CategoryList />} />
          <Route path="/etiquetas" element={<TagList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/p/:slug" element={<StaticPage />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
