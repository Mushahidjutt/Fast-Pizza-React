import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../components/common/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalAmount,
  selectTotalQuantity,
  togglePriority,
  selectPriority,
  selectCartItems,
  setOrderNumber,
  addOrder,
  selectOrderNumber,
} from "../Redux/cartSlice";
import CustomButton from "../components/common/button/CustomButton";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  addres: Yup.string().required("Address is required"),
  number: Yup.string().required("Number is required").matches(/^[0-9]{11}$/, "Number must be 11 digits"),
});

export default function Order() {
  const dispatch = useDispatch();
  const totalquantity = useSelector(selectTotalQuantity);
  const totalamount = useSelector(selectTotalAmount);
  const isPriority = useSelector(selectPriority);
  const items = useSelector(selectCartItems);
  const user = useSelector((state) => state.user?.currentUser);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: user?.name || "", addres: "", number: "" },
    validationSchema,
    onSubmit: () => {
      const orderId = Math.floor(100000 + Math.random() * 900000).toString();
      const baseSubtotal = items.reduce((t, i) => t + i.unitPrice * i.quantity, 0);
      const now = new Date();
      const deliveryDate = new Date(now.getTime() + 60 * 60 * 1000);
      if (isPriority) {
        deliveryDate.setMinutes(deliveryDate.getMinutes() - 20);
      }
        
      dispatch(
        addOrder({
          id: orderId,
          items,
          totalAmount: baseSubtotal,
          isPriority,
          priorityCost: isPriority ? 20 : 0,
          estimatedDelivery: deliveryDate.toISOString(),
        }), );

      dispatch(setOrderNumber(orderId));
      navigate(`/ordersumary/${orderId}`);
    },
  });

  return (
    <div className="relative min-h-screen pb-20">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">First Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
            />
            {formik.errors.name && formik.touched.name ? <div style={{ color: "red" }}>{formik.errors.name}</div> : null}
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone Number</label>
            <input
              type="text"
              name="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
              className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
            />
            {formik.errors.number && formik.touched.number ? <div style={{ color: "red" }}>{formik.errors.number}</div> : null}
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <input
              type="text"
              name="addres"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.addres}
              className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
            />
            {formik.errors.addres && formik.touched.addres ? <div style={{ color: "red" }}>{formik.errors.addres}</div> : null}
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

          <CustomButton type="submit">order now from €{totalamount}</CustomButton>
        </form>
      </div>

      {totalquantity > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 font-semibold text-stone-300">
              {totalquantity} Pizzas €{totalamount}
            </div>
            <button onClick={() => navigate("/cart")}>OPEN CART →</button>
          </div>
        </div>
      )}
    </div>
  );
}
