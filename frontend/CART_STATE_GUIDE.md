# Cart state in `Cart.jsx`

The cart is currently a frontend-only mock. Its product data and state live
inside the `Cart` page component, and React's `useState` keeps that state while
the page is mounted. No Context API, state-management library, authentication,
or Django cart integration is used.

## Initial cart data

`initialCart` is a JavaScript array containing three example products:

- Everyday Runner — $89, quantity 1
- Classic Timepiece — $145, quantity 1
- Studio Headphones — $72, quantity 2

Each item also contains its existing description, color, image URL, and image
alt text. `useState(initialCart)` uses this array as the initial cart whenever
the `Cart` component is mounted.

## Cart component state

Inside `Cart`, this line creates the state:

```jsx
const [cart, setCart] = useState(initialCart);
```

- `cart` is the current array rendered by the page.
- `setCart` replaces the array with an updated version.

Because state belongs to this page component, it is intentionally local. The
cart changes are lost when the page is refreshed or the component is remounted.

## Derived totals

`itemCount` adds each product's quantity, so it counts units rather than
distinct product rows. The subtotal adds each product's price multiplied by its
quantity. Shipping is `$8` while the cart contains at least one product, and
the displayed total is the subtotal plus shipping.

The page uses `Intl.NumberFormat` to format these monetary values as US
currency.

## Updating the cart

`changeQuantity(productId, amount)` uses the functional form of `setCart` to
update the matching product. It creates a new array and a new object for that
product, increasing or decreasing its quantity. A quantity cannot go below 1;
the decrease button is also disabled at 1. Changing a quantity clears any
checkout demo message.

`removeProduct(productId)` filters the selected product out of the cart. The
empty-cart view, item count, subtotal, shipping, and total then update from the
new array. Removing an item also clears the checkout demo message.

## UI and related components

The cart page keeps its existing Tailwind-styled product rows, responsive
quantity controls, empty-cart view, order summary, and demo checkout message.
`Header.jsx` keeps its navigation and cart link/icon but does not show a live
item count, because the cart state is local to `Cart.jsx` and is not shared with
the header.

`App.jsx` renders the routes directly. `main.jsx` continues to provide
`BrowserRouter` for React Router navigation.
