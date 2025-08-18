import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchOrderId,
  selectSearchOrderId,
  selectAllOrders,
} from "../../Redux/cartSlice";
import CustomInput from "./input/CustomInput";

export default function SearchOrderBar() {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchOrderId);
  const orders = useSelector(selectAllOrders);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  return (
    <div>
      <CustomInput
        type="text"
        value={searchValue}
        onChange={(e) => dispatch(setSearchOrderId(e.target.value))}
        placeholder="Search Order ID..."
        variant="search"
      />

      {searchValue.trim() !== "" && (
        <ul className="mt-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <li key={order.id} className=" "></li>
            ))
          ) : (
            <li className="text-gray-500">No orders found</li>
          )}
        </ul>
      )}
    </div>
  );
}
