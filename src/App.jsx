import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Board from "./components/board/Board";
import AppLayout from "./components/layout/Layout";
import { AuthProvider } from "./components/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
