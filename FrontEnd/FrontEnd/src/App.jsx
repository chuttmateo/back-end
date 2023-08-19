import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Administracion from "./routes/administracion/Administracion";
import Detail from "./routes/detail/Detail";
import PaginaNoEncontrada from "./routes/paginaNoEncontrada/PaginaNoEncontrada";
import { ThemeProvider, createTheme } from "@mui/material";
import Register from "./routes/register/Register";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path={`/productos/:id`} element={<Detail />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
