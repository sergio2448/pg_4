import React from "react";

const Review = ({ text }) => {

  
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mb-8 md:mb-0 flex-between items-center p-2">
      {
        text.reviews && text.reviews.map(coment =>
          <div className="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
            <p className="text-gray-600 dark:text-white">
              <span className="font-bold text-indigo-500 text-lg">“</span>
              {coment && coment.comment}
              <span className="font-bold text-indigo-500 text-lg">”</span>
            </p>
            <div className="flex items-center mt-4">
              <div className="flex flex-col ml-2 justify-between">
                <span className="font-semibold text-indigo-500 text-sm">
                  {coment.buyer.firstName} {coment.buyer.lastName}
                </span>
              </div>
            </div>
          </div>

        )
      }

    </div>
  );
};

export default Review;
