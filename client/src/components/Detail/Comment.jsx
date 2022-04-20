import React from "react";

const Comment = () => {
  return (
    <div class="w-full max-w-sm mx-auto">
      <textarea
        class="h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
        placeholder="Christ bless you! . . ."
      ></textarea>
      <div class="flex justify-end">
        <button class="rounded-full py-1 px-2 text-white bg-black">
          Comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
