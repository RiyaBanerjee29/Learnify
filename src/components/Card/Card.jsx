import React from "react";

function Card() {
  return (
    <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div class="min-h-[245px]">
        <img
          src="https://readymadeui.com/cardImg.webp"
          class="w-full rounded-lg"
        />
      </div>
      <div class="p-6 text-center">
        <h3 class="text-xl font-bold">Heading</h3>
        <p class="mt-3 text-sm text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
          auctor arcu, at fermentum dui. Maecenas
        </p>
        <button
          type="button"
          class="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default Card;
