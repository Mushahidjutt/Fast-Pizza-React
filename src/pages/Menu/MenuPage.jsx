import React from 'react'
import Header from '../../components/common/layout/Header'

const MenuItem = [
  {
    id: 1,
    name: "Margherita",
    unitPrice: 799,
    ingredients: ["Tomato Sauce", "Mozzarella", "Basil"],
    soldOut: false,
    imageUrl: "src/assets/photos/pizza-1.jpg",
  },
  {
    id: 2,
    name: "Pepperoni",
    unitPrice: 999,
    ingredients: ["Tomato Sauce", "Mozzarella", "Pepperoni"],
    soldOut: false,
    imageUrl: "src/assets/photos/pizza-2.jpg ",
  },
  {
    id: 3,
    name: "BBQ Chicken",
    unitPrice: 1099,
    ingredients: ["BBQ Sauce", "Chicken", "Onions", "Mozzarella"],
    soldOut: false,
    imageUrl: "src/assets/photos/pizza-3.jpg",
  },
  {
    id: 4,
    name: "Veggie Supreme",
    unitPrice: 899,
    ingredients: ["Tomato Sauce", "Mozzarella", "Peppers", "Olives", "Onions"],
    soldOut: false,
    imageUrl: "src/assets/photos/pizza-4.jpg",
  },
  {
    id: 5,
    name: "Four Cheese",
    unitPrice: 999,
    ingredients: ["Mozzarella", "Cheddar", "Parmesan", "Blue Cheese"],
    soldOut: false,
    imageUrl: "src/assets/photos/pizza-5.jpg",
  },
  {
    id: 6,
    name: "Hawaiian",
    unitPrice: 949,
    ingredients: ["Tomato Sauce", "Mozzarella", "Ham", "Pineapple"],
    soldOut: true,
    imageUrl: "src/assets/photos/pizza-6.jpg",
  },
];

export default function MenuPage() {
  return (
    <div>
      <Header />
      

      <ul>
        {MenuItem.map((pizza) => {
          return (
            <li className='flex gap-4 py-2' key={pizza.id}>
              <img
                className={`h-24 ${pizza.soldOut ? 'opacity-70 grayscale' : ''}`}
                src={pizza.imageUrl}
                alt={pizza.name}
              />
              <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{pizza.name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                  {pizza.ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  {!pizza.soldOut ? (
                    <p className="text-sm">€ {pizza.unitPrice}</p>
                  ) : (
                    <p className="text-sm font-medium uppercase text-stone-500">
                      Sold out
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
