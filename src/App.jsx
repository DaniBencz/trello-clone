import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Board from "./components/board/Board";
import AppLayout from "./components/layout/Layout";
import { AuthProvider } from "./components/auth/AuthProvider";
import ErrorBoundary from "./components/common/ErrorBoundary";

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
                <ErrorBoundary>
                  <Board />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </AuthProvider>
  );
}

export default App;
