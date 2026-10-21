import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Directory from "./pages/Directory";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-white sm:text-xl">
          🏬 Mall Directory
        </Link>
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
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

          {token ? (
            <>
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
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;