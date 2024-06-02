import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Chat from "./chat/Chat";
import SocketServer from "./chat/SocketServer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/socket" element={<SocketServer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
