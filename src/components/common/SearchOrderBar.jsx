import { useDispatch, useSelector } from "react-redux";
import {
  setSearchOrderId,
  selectSearchOrderId,
  selectAllOrders,
} from "../../Redux/cartSlice";
import CustomInput from "./input/CustomInput";
import { useNavigate } from "react-router-dom";

export default function SearchOrderBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector(selectSearchOrderId);
  const orders = useSelector(selectAllOrders);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchValue)
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
              <li
                key={order.id}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/ordersumary/${order.id}`)}
              >
                {order.id}
                
              </li>
            ))
          ) : (
            <li className="text-gray-500">No orders found</li>
          )}
        </ul>
      )}
    </div>
  );
}
