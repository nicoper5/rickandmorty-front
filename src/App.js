import { Routes, Route } from "react-router-dom";
import CharacterDetails from "./components/CharacterDetails";
import WelcomePage from "./components/WelcomePage";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/characters" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
