import React from "react";
import Header from "../components/common/layout/Header";
import CreateUser from "../components/CreateUser";

export default function MainPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl tracking-widest">
        <div className="my-10 px-4 text-center sm:my-16">
          <p className="mb-4 text-sm text-stone-600 md:text-base">
            {" "}
            👋 Welcome! Please start by telling us your name:
          </p>

          <CreateUser />
        </div>
      </main>
    </div>
  );
}
