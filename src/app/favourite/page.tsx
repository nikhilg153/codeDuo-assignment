"use client";

import React, { useEffect, useState } from "react";

const FavoriteListPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve favorites from local storage
    const storedFavorites = localStorage.getItem("favorites");
    console.log("stored", storedFavorites);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  return (
    <div>
      <h2 className="text-center text-2xl my-5 font-medium">Favourites List</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((spellName, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {spellName}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteListPage;
