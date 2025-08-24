import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Board from "./components/board/Board";
import AppLayout from "./components/layout/Layout";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default App;
