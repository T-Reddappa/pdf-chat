import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AiChat from "./pages/Chat";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
