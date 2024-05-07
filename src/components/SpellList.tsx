"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Spell {
  name: string;
  url: string;
  level: number;
  index: string;
}

interface SpellDetail {
  name: string;
  description: string;
}

const SpellListApp: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<SpellDetail | null>(null);

  useEffect(() => {
    // Fetch spells
    axios
      .get("https://www.dnd5eapi.co/api/spells")
      .then((response) => {
        setSpells(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching spells:", error);
      });

    // Retrieve favorites from local storage
    // const storedFavorites = localStorage.getItem("favorites");
    // if (storedFavorites) {
    //   setFavorites(JSON.parse(storedFavorites));
    // }
  }, []);

  const fetchSpellDetail = async (url: string) => {
    try {
      const response = await axios.get(
        `https://www.dnd5eapi.co/api/spells/${url}`
      );
      const spellDetail: SpellDetail = {
        name: response.data.name,
        description: response.data.desc[0],
      };
      setSelectedSpell(spellDetail);
      console.log(selectedSpell);
    } catch (error) {
      console.error("Error fetching spell detail:", error);
    }
  };

  const addToFavorites = (spellName: string) => {
    if (!favorites.includes(spellName)) {
      const newFavorites = [...favorites, spellName];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-2xl font-medium">Spell Details</h2>
        {selectedSpell && (
          <div className="mx-10">
            <h3 className="font-bold">
              Spell Name:{" "}
              <span className="font-normal">{selectedSpell.name}</span>
            </h3>
            <p className="font-bold">
              Spell Description:{" "}
              <span className="font-normal">{selectedSpell.description}</span>
            </p>
          </div>
        )}
      </div>
      <h1 className="text-center text-2xl my-5 font-medium">Spells List</h1>
      <button className="px-4 py-2 bg-blue-800 text-white rounded-lg mx-auto mb-7 flex justify-center hover:bg-blue-600">
        <a href="favourite">See Favourite List</a>
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {spells.map((spell, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {spell.name}
                </th>
                <td className="px-6 py-4">{spell.level}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => fetchSpellDetail(spell.index)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToFavorites(spell.name)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Add to Favorites
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* <ul>
          {spells.map((spell, index) => (
            <li key={index}>
              <button onClick={() => fetchSpellDetail(spell.index)}>
                {spell.name}
              </button>
              <button onClick={() => addToFavorites(spell.name)}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul> */}
        {/* <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spells.map((spell, index) => (
              <tr key={index}>
                <td>{spell.name}</td>
                <td>
                  <button onClick={() => fetchSpellDetail(spell.index)}>
                    View Details
                  </button>
                  <button onClick={() => addToFavorites(spell.name)}>
                    Add to Favorites
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
      {/* <div>
        <h2>Spell Details</h2>
        {selectedSpell && (
          <div>
            <h3>{selectedSpell.name}</h3>
            <p>{selectedSpell.description}</p>
          </div>
        )}
      </div> */}
      {/* <div>
        <h2>Favorites</h2>
        <ul>
          {favorites.map((spellName, index) => (
            <li key={index}>{spellName}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default SpellListApp;
