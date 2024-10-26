import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import loadStorage from "./helpers/checkToken";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KanbanBoard from "./pages/KanbanBoard";
function App() {
  return (
    <Router>
      {loadStorage() && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={!loadStorage() ? <Login /> : <Navigate to="/board" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/board"
          element={loadStorage() ? <KanbanBoard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
