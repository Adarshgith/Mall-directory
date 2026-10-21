import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        setError(
          res.status === 404
            ? "The deployed backend is missing the login endpoint. Redeploy the backend with the latest auth changes."
            : `Login service returned an unexpected response (${res.status}). Check the API URL.`,
        );
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Login failed (${res.status})`);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (requestError) {
      console.error("Admin login request failed:", requestError);
      setError(
        "Unable to connect to the login service. Check the API URL and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">🏬</h1>
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-1">Mall Directory Dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mall.com"
              required
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 bg-gray-50 rounded-lg px-4 py-3 text-center">
          <p className="text-xs text-gray-500">Demo credentials</p>
          <p className="text-sm font-medium text-gray-700 mt-1">
            admin@mall.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;