import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { selectOrders, updateOrder } from "../Redux/cartSlice";
import Header from "../components/common/layout/Header";
import CustomButton from "../components/common/button/CustomButton";

function OrderSummary() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const orders = useSelector(selectOrders);

  const order = useMemo(
    () => orders.find((o) => o.id.toString().toLowerCase() === orderId),
    [orders, orderId]
  );

  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!order?.estimatedDelivery) return;
    const tick = () => {
      const now = new Date();
      const target = new Date(order.estimatedDelivery);
      let diff = target - now;
      if (diff < 0) diff = 0;
      const adj = diff > 0 ? diff - 1000 : 0;
      const m = Math.floor(adj / 60000);
      const s = Math.floor((adj % 60000) / 1000);
      setMinutesLeft(m);
      setSecondsLeft(s);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [order?.estimatedDelivery]);

  const handlePriorityClick = () => {
    if (order) dispatch(updateOrder(order.id));
  };

  if (!order) {
    return (
      <div>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <main className="mx-auto max-w-3xl">
          <div className="px-4 py-6">
            <p className="text-center text-lg font-semibold text-stone-500">No order found</p>
          </div>
        </main>
      </div>
    );
  }

  const baseSubtotal = order.items.reduce((t, i) => t + i.unitPrice * i.quantity, 0);
  const priorityFee = order.isPriority ? order.priorityCost || 0 : 0;
  const totalToPay = baseSubtotal + priorityFee;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>
      <main className="mx-auto max-w-3xl">
        <div className="space-y-8 px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Order #{orderId} Status</h2>
            <div className="space-x-2">
              {order.isPriority && (
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
              {minutesLeft <= 0 && secondsLeft <= 0
                ? "Order should have arrived"
                : `Only ${minutesLeft} min ${secondsLeft} sec left 😃`}
            </p>
            <p className="text-xs text-stone-500">
              (Estimated delivery:{" "}
              {new Date(order.estimatedDelivery).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              )
            </p>
          </div>

          <ul className="divide-y border-b border-t border-gray-300 mt-2 mb-3">
            {order.items.map((item) => (
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
            <p className="text-sm font-medium text-stone-600">Price pizza: ${baseSubtotal}</p>
            {order.isPriority && (
              <p className="text-sm font-medium text-stone-600">Price priority: ${priorityFee}</p>
            )}
            <p className="font-bold">To pay on delivery: ${totalToPay}</p>
          </div>

          {!order.isPriority && (
            <CustomButton
              onClick={handlePriorityClick}
              className="flex justify-end bg-yellow-500 px-4 py-2 font-semibold hover:bg-yellow-600 rounded-full"
            >
              Make Priority
            </CustomButton>
          )}
        </div>
      </main>
    </div>
  );
}

export default OrderSummary;
