import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { setUser, setAccessToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("Logging in...");
    try {
      const response = await api.post("auth/login/", {
        username: username,
        password: password,
      });
      const accessToken = response.data.access;
      const username1 = response.data.username;
      setAccessToken(accessToken);
      // setUser(username1);
      // setMessage(username1 + " Successfully logged in!");
      try {

        const userResponse = await api.get("auth/me/", {

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(userResponse.data);
        setMessage(userResponse.data.username + " Successfully logged in!");
      } catch (error) {
        console.error(error);
        setUser(null);
        setAccessToken(null);
        setMessage("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#1f2925]">
      <Header />

      <main className="mx-auto flex max-w-7xl justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="w-full max-w-md rounded-3xl border border-[#e7e8e3] bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#758078]">
              Welcome back
            </p>
            <h1 className="m-0 text-3xl font-semibold tracking-tight text-[#1f2925]">
              Log in to North &amp; Pine
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#758078]">
              Sign in to continue exploring your everyday favorites.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-[#35453b]"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-xl border border-[#e1e5df] bg-[#f7f8f6] px-4 py-3 text-sm text-[#1f2925] outline-none transition placeholder:text-[#89928b] focus:border-[#9eaaa0] focus:bg-white focus:ring-2 focus:ring-[#294438]/10"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#35453b]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-[#e1e5df] bg-[#f7f8f6] px-4 py-3 text-sm text-[#1f2925] outline-none transition placeholder:text-[#89928b] focus:border-[#9eaaa0] focus:bg-white focus:ring-2 focus:ring-[#294438]/10"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#294438] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f352a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#294438]"
            >
              Login
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-[#758078]" role="status">
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-[#68746d]">
            New to North &amp; Pine?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#294438] underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
