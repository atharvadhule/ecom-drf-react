import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import Header from "./Header";
import "../css/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);

      if (!id) {
        setError("A product ID was not provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
      } catch (requestError) {

        const status = requestError.response?.status;
        const detail = requestError.response?.data?.detail;

        if (typeof detail === "string") {
          setError(detail);
        } else if (status === 404) {
          setError("Product not found.");
        } else if (!requestError.response) {
          setError("Could not connect to the server. Please try again.");
        } else {
          setError(`Could not load the product (HTTP ${status}).`);
        }
      } finally {
          setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      setProduct(null);};
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <Header />
        <main className="detail-main">
          <p className="product-details-status">Loading product...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page">
        <Header />
        <main className="detail-main">
          <p
            className="product-details-status product-details-error"
            role="alert"
          >
            {error}
          </p>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-page">
        <Header />
        <main className="detail-main">
          <p className="product-details-status">
            Product details are unavailable.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Header />
      <main className="detail-main">
        <Link className="detail-back-link" to="/">
          <span aria-hidden="true">←</span> Back to collection
        </Link>
        <article className="product-details-card">
          {product.image ? (
            <img
              className="detail-image"
              src={product.image}
              alt={product.name}
            />
          ) : (
            <div className="detail-art" aria-hidden="true">
              <span>{product.category || "NORTH & PINE"}</span>
              <div className="detail-art-orbit" />
            </div>
          )}
          <div className="detail-content">
            <p className="detail-eyebrow">
              {product.category || "The collection"}
            </p>
            <h1 className="product-details-name">{product.name}</h1>
            <p className="product-details-description">
              {product.description || "No description is available."}
            </p>
            <p className="detail-price">
              {product.price == null
                ? "Price unavailable"
                : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
            </p>
            <dl className="product-details-facts">
              {product.stock != null && (
                <div>
                  <dt>Availability</dt>
                  <dd>
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </dd>
                </div>
              )}
              {product.category && (
                <div>
                  <dt>Category</dt>
                  <dd>{product.category}</dd>
                </div>
              )}
            </dl>
            <Link className="detail-shop-link" to="/cart">
              Explore your cart <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

export default ProductDetails;
