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
      <Routes>
        <Route
          path="/login"
          element={ <Login /> }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/owned-tasks"
          element={
           (
              <KanbanBoard type={"owned"} />
            )
          }
        />
        <Route
          path="/assigned-tasks"
          element={
 (
              <KanbanBoard type={"assigned"} />
            ) 
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
