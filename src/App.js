import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import AddQuote from "./containers/AddQuote/AddQuote";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes/:id" element={<Home />} />
        <Route path="/new" element={<AddQuote />} />
        <Route path="*" element={<h1 className="not-found">Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
