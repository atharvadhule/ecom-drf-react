import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import Header from "./Header";
import "../css/Home.css";

function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const visibleProducts = products.filter((product) =>
    [product.name, product.category, product.description]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(searchQuery)),
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/");
        setProducts(response.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.detail ||
          requestError.message ||
          "Could not load products.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="store-page">
        <Header />
        <main className="store-main">
          <p className="home-status">Loading products...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-page">
        <Header />
        <main className="store-main">
          <p className="home-status home-error" role="alert">
            Error loading products: {error}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="store-page">
      <Header />
      <main className="store-main">
        <section className="store-intro">
          <div>
            <p className="store-eyebrow">Considered goods for everyday life</p>
            <h1 className="home-title">Find your next favorite.</h1>
            <p className="store-intro-copy">
              Thoughtful essentials, selected to bring a little more joy to
              every day.
            </p>
          </div>
          <div className="store-intro-mark" aria-hidden="true">
            <span>NP</span>
          </div>
        </section>

        <div className="collection-heading">
          <div>
            <p className="store-eyebrow">The collection</p>
            <h2>Shop all products</h2>
          </div>
          <span>
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {visibleProducts.length === 0 ? (
          <section id="products" className="home-empty">
            <h2>
              {searchQuery ? "No matching products" : "No products are available"}
            </h2>
            <p>
              {searchQuery
                ? `No products match “${searchParams.get("q")}”. Try another search.`
                : "Please check back later for new arrivals."}
            </p>
          </section>
        ) : (
          <section
            id="products"
            className="product-grid scroll-mt-28"
            aria-label="Products"
          >
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                {product.image ? (
                  <img
                    className="product-card-image"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="product-card-art" aria-hidden="true">
                    <span>{product.category || "NORTH & PINE"}</span>
                    <div className="product-card-orbit" />
                  </div>
                )}
                <div className="product-card-content">
                  <div className="product-card-heading">
                    <h3 className="product-name">{product.name}</h3>
                    {product.category && (
                      <span className="product-category">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <p className="product-description">
                    {product.description}
                  </p>
                  <div className="product-card-footer">
                    <p className="product-price">
                      {product.price == null
                        ? "Price unavailable"
                        : new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                    </p>
                    <Link
                      className="product-details-link"
                      to={`/products/${product.id}`}
                    >
                      View details <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
