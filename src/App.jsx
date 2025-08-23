import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./components/auth/Auth";
import { Board } from "./components/board/Board";

const ProtectedRoute = ({ children }) => {
  // TODO: import from service layer
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="app-container">
      <main className="app-content">
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
      </main>
    </div>
  );
}

export default App;
