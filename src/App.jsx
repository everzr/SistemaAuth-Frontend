import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Proof from "./pages/proof";
import FaceAuth from './components/FaceAuth'
import LoginFace from "./components/LoginFace";
import RegisterFace from "./components/RegisterFace";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/proof" element={<Proof />} />
        <Route path="/face" element={<FaceAuth />} />
        <Route path="/login-face" element={<LoginFace/>}/>
        <Route path="/register-face" element={<RegisterFace/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
