import React, { useState } from 'react'
import Header from '../../components/common/layout/Header'
import CustomButton from '../../components/common/button/CustomButton';

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
    imageUrl: "public/photos/pizza-2.jpg ",
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
  const [count ,setCounter] = useState(0);
  return (
    <div>
      <Header />
      
      <div className='bg-stone-100 text-stone-700 overflow-scroll'>

        <main className='mx-auto max-w-3xl'>

    <ul className=''>
        {MenuItem.map((pizza) => {
          return (
            <li className='flex gap-4 py-2 border-b border-gray-300 ' key={pizza.id}>
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
                  <CustomButton>
                    Add To Cart
                  </CustomButton>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      </main>
      </div>
    </div>
  );
}
