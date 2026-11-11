import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../api/axios";


function Header() {
  const { user , setUser , logout , setAccessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout(event) {
    event.preventDefault();
    setUser(null);
    setAccessToken(null);
    setAuthToken(null);
    logout();

    navigate("/login");
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q")?.toString().trim() || "";
    navigate({
      pathname: "/",
      search: query ? `?q=${encodeURIComponent(query)}` : "",
      hash: "products",
    });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#e7e8e3] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link
          to="/"
          className="order-1 whitespace-nowrap text-base font-extrabold tracking-[0.18em] text-[#1f2925] no-underline sm:text-lg"
          aria-label="North and Pine home"
        >
          NORTH <span className="text-[#839187]">&</span> PINE
        </Link>

        <nav
          className="order-3 flex items-center gap-6 text-sm font-semibold text-[#56635c] lg:order-2"
          aria-label="Main navigation"
        >
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link
            to="/"
            className="no-underline transition-colors hover:text-[#1f2925] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#294438]"
          >
            Home
          </Link>
          <Link
            to="/#products"
            className="no-underline transition-colors hover:text-[#1f2925] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#294438]"
          >
            Products
          </Link>
        </nav>

        <form
          role="search"
          onSubmit={handleSearchSubmit}
          key={location.search}
          className="order-4 flex w-full items-center rounded-full border border-[#e1e5df] bg-[#f7f8f6] px-4 py-2.5 transition focus-within:border-[#9eaaa0] focus-within:bg-white lg:order-3 lg:w-full lg:max-w-sm"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-2.5 shrink-0 text-[#758078]"
          >
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={new URLSearchParams(location.search).get("q") || ""}
            placeholder="Search products"
            aria-label="Search products"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#1f2925] outline-none placeholder:text-[#89928b]"
          />
          <button type="submit" className="sr-only">
            Search
          </button>
        </form>

        <Link
          to="/cart"
          aria-label="Shopping cart"
          className="order-2 inline-flex items-center gap-2 rounded-full border border-[#e1e5df] px-3 py-2 text-sm font-semibold text-[#35453b] no-underline transition hover:border-[#cbd4ca] hover:bg-[#f7f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#294438] lg:order-4"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-5"
          >
            <path
              d="M3.5 4.5h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4l1.2-6.3H6.3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="1.2" fill="currentColor" />
            <circle cx="18" cy="20" r="1.2" fill="currentColor" />
          </svg>
          <span className="hidden sm:inline">Cart</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
