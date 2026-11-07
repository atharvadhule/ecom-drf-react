import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const initialCart = [
  {
    id: 1,
    name: "Everyday Runner",
    description: "Lightweight knit sneaker",
    color: "Sand / White",
    price: 89,
    quantity: 1,
    image: "http://127.0.0.1:8000/media/products/image_mNrCyRK.png",
    imageAlt: "Red running sneaker",
  },
  {
    id: 2,
    name: "Classic Timepiece",
    description: "Minimal stainless steel watch",
    color: "Silver / Black",
    price: 145,
    quantity: 1,
    image: "http://127.0.0.1:8000/media/products/image_aWsNhGa.png",
    imageAlt: "Minimal wristwatch",
  },
  {
    id: 3,
    name: "Studio Headphones",
    description: "Wireless over-ear headphones",
    color: "Forest Green",
    price: 72,
    quantity: 2,
    image: "http://127.0.0.1:8000/media/products/image_aWsNhGa.png",
    imageAlt: "Over-ear headphones",
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const itemCount = cart.reduce((sum, product) => sum + product.quantity, 0);
  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const shipping = cart.length > 0 ? 8 : 0;
  const total = subtotal + shipping;

  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product,
      ),
    );
    setCheckoutMessage("");
  }

  function removeProduct(productId) {
    setCart((currentCart) =>
      currentCart.filter((product) => product.id !== productId),
    );
    setCheckoutMessage("");
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#1f2925]">
      <Header />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#758078]">
              Your selection
            </p>
            <h1 className="m-0 text-3xl font-semibold tracking-tight text-[#1f2925] sm:text-4xl">
              Shopping cart
            </h1>
          </div>
          <p className="text-sm text-[#68746d]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        {cart.length === 0 ? (
          <section className="rounded-3xl border border-[#e7e8e3] bg-white px-6 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-[#f0f3ef] text-2xl text-[#53665a]">
              0
            </div>
            <h2 className="mb-2 text-xl font-semibold text-[#1f2925]">
              Your cart is empty
            </h2>
            <p className="mx-auto mb-7 max-w-sm text-sm leading-6 text-[#758078]">
              Looks like you have not found your next favorite yet.
            </p>
            <Link
              to="/"
              className="inline-flex rounded-full bg-[#294438] px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-[#1f352a]"
            >
              Explore the collection
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
            <section
              aria-label="Cart items"
              className="overflow-hidden rounded-3xl border border-[#e7e8e3] bg-white shadow-sm"
            >
              <div className="hidden grid-cols-[minmax(0,1fr)_120px_110px] gap-4 border-b border-[#eceee9] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#89928b] sm:grid">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <ul className="m-0 list-none divide-y divide-[#eceee9] p-0">
                {cart.map((product) => (
                  <li
                    key={product.id}
                    className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[104px_minmax(0,1fr)_120px_110px] sm:items-center sm:gap-5 sm:px-6 sm:py-6"
                  >
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="aspect-square w-[88px] rounded-2xl bg-[#f0f1ed] object-cover sm:w-[104px]"
                    />

                    <div className="min-w-0">
                      <p className="mb-1 truncate font-semibold text-[#26332c]">
                        {product.name}
                      </p>
                      <p className="mb-1 text-sm text-[#758078]">
                        {product.description}
                      </p>
                      <p className="text-xs text-[#89928b]">{product.color}</p>
                      <p className="mt-2 text-sm font-medium text-[#44554a]">
                        {currency.format(product.price)}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 sm:hidden">
                        <QuantityControl
                          product={product}
                          onChange={changeQuantity}
                        />
                        <span className="font-semibold text-[#26332c]">
                          {currency.format(product.price * product.quantity)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="mt-3 rounded text-xs font-semibold text-[#8b6258] underline-offset-4 hover:text-[#713e33] hover:underline"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="hidden justify-center sm:flex">
                      <QuantityControl
                        product={product}
                        onChange={changeQuantity}
                      />
                    </div>

                    <p className="hidden text-right font-semibold text-[#26332c] sm:block">
                      {currency.format(product.price * product.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 border-t border-[#eceee9] px-5 py-4 text-xs text-[#758078] sm:px-6">
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center rounded-full border border-[#9eaaa0] text-[10px] font-bold"
                >
                  i
                </span>
                Mock cart only. Your changes are not saved after leaving this page.
              </div>
            </section>

            <aside className="rounded-3xl border border-[#e7e8e3] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="mb-6 text-lg font-semibold text-[#26332c]">
                Order summary
              </h2>
              <div className="space-y-4 border-b border-[#eceee9] pb-5 text-sm">
                <div className="flex justify-between gap-4 text-[#68746d]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#26332c]">
                    {currency.format(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-[#68746d]">
                  <span>Standard shipping</span>
                  <span className="font-medium text-[#26332c]">
                    {currency.format(shipping)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4 py-5 text-base font-bold text-[#26332c]">
                <span>Total</span>
                <span>{currency.format(total)}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCheckoutMessage(
                    "Checkout is a demo and is not connected to a payment service.",
                  )
                }
                className="w-full rounded-full bg-[#294438] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1f352a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#294438]"
              >
                Continue to checkout
              </button>
              {checkoutMessage && (
                <p className="mt-3 text-center text-xs leading-5 text-[#758078]">
                  {checkoutMessage}
                </p>
              )}
              <p className="mt-4 text-center text-xs leading-5 text-[#89928b]">
                Shipping and taxes are shown for this demo.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function QuantityControl({ product, onChange }) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-[#e1e5df] bg-white"
      aria-label={`Quantity for ${product.name}`}
    >
      <button
        type="button"
        onClick={() => onChange(product.id, -1)}
        disabled={product.quantity === 1}
        className="flex size-9 items-center justify-center rounded-full text-lg text-[#53635a] transition hover:bg-[#f1f3ef] disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={`Decrease ${product.name} quantity`}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-[#26332c]">
        {product.quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(product.id, 1)}
        className="flex size-9 items-center justify-center rounded-full text-lg text-[#53635a] transition hover:bg-[#f1f3ef]"
        aria-label={`Increase ${product.name} quantity`}
      >
        +
      </button>
    </div>
  );
}

export default Cart;