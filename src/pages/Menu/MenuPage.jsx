import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/common/layout/Header";
import CustomButton from "../../components/common/button/CustomButton";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  selectCartItems,
  selectVisibleIds,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../Redux/cartSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(selectCartItems);
  const visibleIds = useSelector(selectVisibleIds);
  const TotalAmount = useSelector(selectTotalAmount);
  const TotalQuantity = useSelector(selectTotalQuantity);

  return (
    <div className="flex flex-col h-screen">
      
      <div className="">
        <Header />
      </div>

      
      <div className="flex items-center justify-center">
        <main className="flex-1 overflow-y-auto bg-stone-100 text-stone-700 px-4 max-w-3xl">
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
                      {pizza.soldOut ? (
                        <p className="text-sm font-medium uppercase text-stone-500">
                          Sold out
                        </p>
                      ) : (
                        <p className="text-sm">€ {pizza.unitPrice}</p>
                      )}

                      {!pizza.soldOut ? (
                        existingItem && visibleIds.includes(pizza.id) ? (
                          <div>
                            <button
                              className="mr-2 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                              onClick={() => dispatch(removeFromCart(pizza.id))}
                            >
                              -
                            </button>
                            {existingItem.quantity}
                            <button
                              className="ml-2 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                              onClick={() => dispatch(addToCart(pizza))}
                            >
                              +
                            </button>
                            <button
                              className="ml-2 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                              onClick={() => dispatch(deleteFromCart(pizza.id))}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <CustomButton
                            onClick={() => dispatch(addToCart(pizza))}
                          >
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
        </main>
      </div>

      
      {TotalQuantity > 0 && (
        <div className="sticky bottom-0 z-50 bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 font-bold">
              {TotalQuantity}  Pizzas <span className="ml-1"> €{TotalAmount}</span> 
            </div>
            <button onClick={() => navigate("/cart")} className=" ">
              Open cart →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
