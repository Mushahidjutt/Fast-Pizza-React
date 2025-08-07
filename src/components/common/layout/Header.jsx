import React from "react";
import CustomInput from "../input/CustomInput";

export default function Header() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-2.5 uppercase sm:px-6">
        <a className="tracking-widest" href="/">
          Fast React Pizza Co.
        </a>

        
          <CustomInput
            id="email"
            name="email"
            placeholder="Search  order  #"
            variant="search"
          />
        
      </div>
    </div>
  );
}
