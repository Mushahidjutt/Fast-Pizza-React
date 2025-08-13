import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  togglePriority,
  selectPriority,
  setEstimatedDelivery,
  selectDeliveryInMinutes,
  selectTotalAmount,
  selectPriorityCost,
  selectCartItems,
  selectEstimatedDelivery,
  updateDeliveryTime,
  selectOrderNumber,
  selectOrders,
  selectSearchOrderId,
  addOrder
} from "../Redux/cartSlice";
import Header from "../components/common/layout/Header";
import CustomButton from "../components/common/button/CustomButton";

function OrderSummary() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const orderNumber = useSelector(selectOrderNumber);
  const deliveryInMinutes = useSelector(selectDeliveryInMinutes);
  const estimatedTime = useSelector(selectEstimatedDelivery);
  const isPriority = useSelector(selectPriority);
  const priorityCost = useSelector(selectPriorityCost);
  const totalAmount = useSelector(selectTotalAmount);
  const items = useSelector(selectCartItems);
  const orders = useSelector(selectOrders);
  const searchOrderId = useSelector(selectSearchOrderId);

  const filteredOrders = orders.filter(
    (order, index, self) =>
      order.id.toString().toLowerCase().includes(searchOrderId.toLowerCase()) &&
      index === self.findIndex(o => o.id === order.id)
  );

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (items.length > 0 && (orderNumber || orderId)) {
      const exists = orders.some(o => o.id.toString() === (orderNumber || orderId).toString());
      if (!exists) {
        dispatch(
          addOrder({
            id: (orderNumber || orderId).toString(),
            items,
            totalAmount,
            priority: isPriority,
            estimatedDelivery: estimatedTime
          })
        );
      }
    }
    
  }, [dispatch, items, orderNumber, orderId, totalAmount, isPriority, estimatedTime]);

  useEffect(() => {
    if (items.length > 0) {
      const oneHourLater = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      dispatch(setEstimatedDelivery(oneHourLater));
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      dispatch(updateDeliveryTime());
      if (estimatedTime) {
        const now = new Date();
        const deliveryDate = new Date(estimatedTime);
        const diffMs = deliveryDate - now;
        setSecondsLeft(diffMs > 0 ? Math.floor((diffMs % (1000 * 60)) / 1000) : 0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, estimatedTime, items.length]);

  const handlePriorityClick = () => {
    dispatch(togglePriority(true));
    if (estimatedTime) {
      const newDeliveryTime = new Date(estimatedTime);
      newDeliveryTime.setMinutes(newDeliveryTime.getMinutes() - 20);
      dispatch(setEstimatedDelivery(newDeliveryTime.toISOString()));
    }
  };

  const formattedDeliveryTime = estimatedTime
    ? new Date(estimatedTime).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
    : "N/A";

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>
      <main className="mx-auto max-w-3xl">
        <div className="space-y-8 px-4 py-6">
          {searchOrderId && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Search Results:</h3>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="border-b py-2">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Total:</strong> ${order.totalAmount}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No matching orders found.</p>
              )}
            </div>
          )}

          {items.length === 0 ? (
            <p className="text-center text-lg font-semibold text-stone-500">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">
                  Order #{orderNumber || orderId} Status
                </h2>
                <div className="space-x-2">
                  {isPriority && (
                    <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                      Priority
                    </span>
                  )}
                  <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                    Preparing order
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
                <p className="font-medium">
                  {deliveryInMinutes <= 0 && secondsLeft <= 0
                    ? "Order should have arrived"
                    : `Only ${deliveryInMinutes} min ${secondsLeft}s left 😃`}
                </p>
                <p className="text-xs text-stone-500">
                  (Estimated delivery: {formattedDeliveryTime})
                </p>
              </div>

              <ul className="divide-y border-b border-t border-gray-300 mt-2 mb-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between mt-2 mb-2 py-2">
                    <div>
                      <strong>{item.quantity} x </strong> {item.name}
                      {item.ingredients && (
                        <span className="mt-2">
                          <br /> {item.ingredients.join(", ")}
                        </span>
                      )}
                    </div>
                    <div>
                      <strong>${item.unitPrice * item.quantity}.00</strong>
                    </div>
                  </div>
                ))}
              </ul>

              <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="text-sm font-medium text-stone-600">
                  Price pizza: ${totalAmount}
                </p>
                {isPriority && (
                  <p className="text-sm font-medium text-stone-600">
                    Price priority: ${priorityCost}
                  </p>
                )}
                <p className="font-bold">
                  To pay on delivery: $
                  {totalAmount + (isPriority ? priorityCost : 0)}
                </p>
              </div>

              {!isPriority && (
                <CustomButton
                  onClick={handlePriorityClick}
                  className="flex justify-end bg-yellow-500 px-4 py-2 font-semibold hover:bg-yellow-600 rounded-full"
                >
                  Make Priority
                </CustomButton>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default OrderSummary;
