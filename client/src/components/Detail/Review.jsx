import React from "react";

const Review = ({ text }) => {
  console.log("text", text)
  return (
    <div class="w-full flex flex-col md:flex-row gap-4 mb-8 md:mb-0 flex-between items-center p-8">
      <div class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
        <p class="text-gray-600 dark:text-white">
          <span class="font-bold text-indigo-500 text-lg">“</span>
           {text[0] && text[0].comment}
          <span class="font-bold text-indigo-500 text-lg">”</span>
        </p>
        <div class="flex items-center mt-4">
          <a href="#" class="block relative">
            <img
              alt="profil"
              src="/images/person/1.jpg"
              class="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </a>
          <div class="flex flex-col ml-2 justify-between">
            <span class="font-semibold text-indigo-500 text-sm">
            {text[0] && text[0].buyer.firstName}
            </span>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
        <p class="text-gray-600 dark:text-white">
          <span class="font-bold text-indigo-500 text-lg">“</span>
          {text[1] && text[1].comment}
          <span class="font-bold text-indigo-500 text-lg">”</span>
        </p>
        <div class="flex items-center mt-4">
          <a href="#" class="block relative">
            <img
              alt="profil"
              src="/images/person/1.jpg"
              class="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </a>
          <div class="flex flex-col ml-2 justify-between">
            <span class="font-semibold text-indigo-500 text-sm">
            {text[1] && text[1].buyer.firstName}
            </span>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
        <p class="text-gray-600 dark:text-white">
          <span class="font-bold text-indigo-500 text-lg">“</span>
          {text[2] && text[2].comment}
          <span class="font-bold text-indigo-500 text-lg">”</span>
        </p>
        <div class="flex items-center mt-4">
          <a href="#" class="block relative">
            <img
              alt="profil"
              src="/images/person/1.jpg"
              class="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </a>
          <div class="flex flex-col ml-2 justify-between">
            <span class="font-semibold text-indigo-500 text-sm">
            {text[2] && text[2].buyer.firstName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
