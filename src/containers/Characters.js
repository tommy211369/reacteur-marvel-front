import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";

export default function Characters() {
  const [characters, setCharacters] = useState("");
  const [characterInput, setCharacterInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("http://localhost:4000/characters");
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacter = (e) => {
    console.log(e.target.value);
    setCharacterInput(e.target.value);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="characters">
      <Input
        type="text"
        placeholder="Rechercher un personnage"
        handle={handleCharacter}
      />

      <div className="grid">
        {characters.map((character) => {
          return (
            <div key={character._id} className="character">
              <Link to={`/comics/${character._id}`}>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />

                <p>{character.name}</p>

                {character.description && (
                  <p className="description">{character.description}</p>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
