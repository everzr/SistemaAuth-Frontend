import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import FaceAuth from "./components/FaceAuth";
import LoginFace from "./components/LoginFace";
import RegisterFace from "./components/RegisterFace";
import Home from "./pages/Home/Home";
import Proof from "./pages/proof/proof";
import PostDetail from "./pages/PostDetails"; // ojo: singular si tu archivo es así
import CategoryList from "./pages/CategoryList/CategoryList";
import TagList from "./pages/TagList/TagList";
import StaticPage from "./pages/StaticPage";
import AppLayout from "./components/Layout/AppLayout";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas sin navbar */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas con navbar (hijas del layout) */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/face" element={<FaceAuth />} />
          <Route path="/login-face" element={<LoginFace />} />
          <Route path="/register-face" element={<RegisterFace />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/categorias" element={<CategoryList />} />
          <Route path="/etiquetas" element={<TagList />} />
          <Route path="/p/:slug" element={<StaticPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
