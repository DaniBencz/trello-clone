import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Simple placeholder components
const Home = () => (
  <div>
    <h1>Auth</h1>
    <Link to="/tasks">Go to Tasks</Link>
  </div>
);

const Tasks = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Board</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

function App() {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
