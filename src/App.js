import "./App.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MeteoDetails from "./components/MeteoDetails";

import MyFooter from "./components/MyFooter";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/details/:city" element={<MeteoDetails />} />

      {/* Rimuovi il parametro movieID */}
    </Routes>
    <MyFooter />
  </BrowserRouter>
);

export default App;
