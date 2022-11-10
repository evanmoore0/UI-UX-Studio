import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [cart, setCart] = useState([]);

  // Compute the total price of the items in the cart
  function handleTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total.toFixed(2);
  }

  function handleCart(item) {
    let inCart = false;
    let temp = [...cart];

    // Iterate through the cart and increment the quantity of the item if it is already in the cart
    temp.forEach((cartItem, index) => {
      if (cartItem.name === item.name) {
        temp[index] = {
          name: cartItem.name,
          quantity: cartItem.quantity + 1,
          price: cartItem.price,
        };
        setCart(temp);
        inCart = true;

        return;
      }
    });

    // If the item is not in the cart add it with a quantity of 1
    if (!inCart) {
      setCart((prevCart) => [
        ...prevCart,
        { name: item.name, quantity: 1, price: item.price },
      ]);
    }
  }

  return (
    <div className="App">
      <h1>My Bakery</h1>
      <main>
        <section>
          {bakeryData.map((item, index) => (
            <div className="item-container">
              <BakeryItem
                key={index}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
              />

              <button onClick={() => handleCart(item)}>Add to Cart</button>
            </div>
          ))}
        </section>
        <div className="cart">
          <h2>Cart</h2>
          {cart.map((item, index) => (
            <p id="cart-text" key={index}>{`${item.quantity}x ${item.name}`}</p>
          ))}
          <h1>{`Total: $${handleTotal()}`}</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
