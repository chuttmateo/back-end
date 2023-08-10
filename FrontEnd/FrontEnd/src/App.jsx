import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Administracion from "./routes/administracion/Administracion";
import PaginaNoEncontrada from "./routes/paginaNoEncontrada/PaginaNoEncontrada";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path={`/products/detail/:id`} element={[]} />
        <Route path="/administracion" element={<Administracion />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
