import React, { useState } from "react";
import Header from "../components/common/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  removeFromCart,
  deleteFromCart,
  clearCart
} from "../Redux/cartSlice";

import { useNavigate } from "react-router-dom";
import CustomButton from "../components/common/button/CustomButton";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);

  const [isClick, setIsClick] = useState(false);

  const handleDeleteAll = () => {
    dispatch(clearCart());
    setIsClick(true);
  };

  return (
    <div>
      <Header />

      <main className="mx-auto max-w-3xl mt-4">
        <button
          className="text-blue-600"
          onClick={() => navigate("/menupage")}
        >
          ← Back to menu
        </button>

        {isClick ? (
          <p className="mt-7 font-semibold" >Your cart is still empty. Start adding some pizzas :</p>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mt-3">Your cart</h1>

            {items.length === 0 && <p>Your Cart is Empty</p>}

            {items.map((item) => (
              <div key={item.id} className="border-b border-gray-300">
                <div className="flex justify-between mt-4 mb-4">
                  <div>
                    {item.quantity} x {item.name}
                  </div>

                  <div>
                    € {item.quantity * item.unitPrice}

                    <button
                      className="mr-2 ml-4 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="ml-2 mr-1.5 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      +
                    </button>
                    <button
                      className="ml-6 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2"
                      onClick={() => dispatch(deleteFromCart(item.id))}

                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <CustomButton onClick={() => navigate("/order")}>
                Order Pizza
              </CustomButton>

              <button
                className="ml-4 inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 px-4 py-2.5 md:px-6 md:py-3.5"
                onClick={handleDeleteAll}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom fixed bar */}
      {totalQuantity > 0 && (
        <div className="fixed bottom-0 w-full bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              {totalQuantity} Pizzas €{totalAmount}
            </div>
            <div>
              <button onClick={() => navigate("/cart")}>
                Open cart →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
