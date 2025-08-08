import React, { useState } from "react";
import Header from "../../components/common/layout/Header";
import CustomButton from "../../components/common/button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalAmount } from "../../Redux/cartSlice";
useDispatch

const MenuItem = [
  {
    id: 1,
    name: "Margherita",
    unitPrice: 79,
    ingredients: ["Tomato Sauce", "Mozzarella", "Basil"],
    soldOut: false,
    imageUrl: "public/photos/pizza-1.jpg",
  },
  {
    id: 2,
    name: "Pepperoni",
    unitPrice: 99,
    ingredients: ["Tomato Sauce", "Mozzarella", "Pepperoni"],
    soldOut: true,
    imageUrl: "public/photos/pizza-2.jpg",
  },
  {
    id: 3,
    name: "BBQ Chicken",
    unitPrice: 10,
    ingredients: ["BBQ Sauce", "Chicken", "Onions", "Mozzarella"],
    soldOut: false,
    imageUrl: "public/photos/pizza-3.jpg",
  },
  {
    id: 4,
    name: "Veggie Supreme",
    unitPrice: 84,
    ingredients: ["Tomato Sauce", "Mozzarella", "Peppers", "Olives", "Onions"],
    soldOut: false,
    imageUrl: "public/photos/pizza-4.jpg",
  },
  {
    id: 5,
    name: "Four Cheese",
    unitPrice: 67,
    ingredients: ["Mozzarella", "Cheddar", "Parmesan", "Blue Cheese"],
    soldOut: false,
    imageUrl: "public/photos/pizza-5.jpg",
  },
  {
    id: 6,
    name: "Hawaiian",
    unitPrice: 98,
    ingredients: ["Tomato Sauce", "Mozzarella", "Ham", "Pineapple"],
    soldOut: true,
    imageUrl: "public/photos/pizza-6.jpg",
  },
];

export default function MenuPage() {
  const [cart, setCart] = useState([]);
  const [visibleIds, setVisibleIds] = useState([]);
  


  const addHandleClick = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show buttons for this item
    if (!visibleIds.includes(product.id)) {
      setVisibleIds((prev) => [...prev, product.id]);
    }
  };

  const removeHandleClick = (product) => {
    const updatedCart = cart
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const deleteHandleClick = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);

    // Hide buttons for this item
    setVisibleIds((prev) => prev.filter((id) => id !== product.id));
  };

  return (
    <div>
      <Header />
      <div className="bg-stone-100 text-stone-700 overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <ul>
            {MenuItem.map((pizza) => {
              const existingItem = cart.find((item) => item.id === pizza.id);

              return (
                <li
                  key={pizza.id}
                  className="flex gap-4 py-2 border-b border-gray-300"
                >
                  <img
                    className={`h-24 ${
                      pizza.soldOut ? "opacity-70 grayscale" : ""
                    }`}
                    src={pizza.imageUrl}
                    alt={pizza.name}
                  />
                  <div className="flex grow flex-col pt-0.5">
                    <p className="font-medium">{pizza.name}</p>
                    <p className="text-sm capitalize italic text-stone-500">
                      {pizza.ingredients.join(", ")}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Price or Sold Out */}
                      {pizza.soldOut ? (
                        <p className="text-sm font-medium uppercase text-stone-500">
                          Sold out
                        </p>
                      ) : (
                        <p className="text-sm">€ {pizza.unitPrice}</p>
                      )}

                      {/* Buttons */}
                      {!pizza.soldOut ? (
                        existingItem && visibleIds.includes(pizza.id) ? (
                          <div>
                            <button
                              className="mr-2 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                              onClick={() => removeHandleClick(pizza)}
                            >
                              -
                            </button>
                            {existingItem.quantity}
                            <button
                              className="ml-2 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                              onClick={() => addHandleClick(pizza)}
                            >
                              +
                            </button>

                            <button
                              className="ml-2 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                              onClick={() => dispatch(deleteHandleClick(pizza))}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <CustomButton onClick={() => dispatch(addHandleClick(pizza))}>
                            Add To Cart
                          </CustomButton>
                        )
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <h1>Total Amount is : {total}</h1>
        </main>
      </div>
    </div>
  );
}
