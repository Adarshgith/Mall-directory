import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Directory from "./pages/Directory";
import AdminDashboard from "./pages/AdminDashboard";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-gray-900 shadow-lg px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">🏬 Mall Directory</h1>
      <div className="flex gap-6">
        <Link
          to="/"
          className={`font-medium transition-colors ${
            location.pathname === "/"
              ? "text-blue-400"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Directory
        </Link>
        <Link
          to="/admin"
          className={`font-medium transition-colors ${
            location.pathname === "/admin"
              ? "text-blue-400"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="w-full px-8 py-6">
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;