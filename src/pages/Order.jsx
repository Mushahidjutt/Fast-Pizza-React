import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalAmount,
  selectTotalQuantity,
  togglePriority,
  selectPriority,
  selectCartItems,
  setOrderNumber,
  
} from "../Redux/cartSlice";
import CustomButton from "../components/common/button/CustomButton";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const dispatch = useDispatch();
  const totalquantity = useSelector(selectTotalQuantity);
  const user = useSelector((state) => state.user?.currentUser);
  
  const totalamount = useSelector(selectTotalAmount);
  const navigate = useNavigate();
  const isPriority = useSelector(selectPriority);
  const items = useSelector(selectCartItems);

  
  

  console.log("items before reload: ", items);

  const handlePlaceOrder = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000); // 6-digit
    dispatch(setOrderNumber(orderId));
    navigate(`/ordersumary/${orderId}`);
  };



  


  return (
    <div className="relative min-h-screen pb-20">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="mb-8 text-xl font-semibold">
          Ready to order? Let's go!
        </h2>
        <form>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">First Name</label>
            <input
              className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 
               focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
              type="text" value={user}
              required
            />
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone Number</label>
            <input
              className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 
               focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
              type="text"
              required
            />
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <input
              className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 
               focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
              type="text"
              required
            />
          </div>

          <div className="mb-12 flex items-center gap-5">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              checked={isPriority}
              onChange={(e) => dispatch(togglePriority(e.target.checked))}
            />
            <label>Want to give your order priority?</label>
          </div>

          <CustomButton onClick={handlePlaceOrder}>
            order now from €{totalamount}
          </CustomButton>
        </form>
      </div>

      {/* Bottom Fixed Cart Bar */}
      {totalquantity > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 font-semibold text-stone-300">
              {totalquantity} Pizzas €{totalamount}
            </div>
            <button
              onClick={() => {
                handleClick();
                navigate("/cart");
              }}
              className=" "
            >
              OPEN CART →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
