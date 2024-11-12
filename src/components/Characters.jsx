import { useState, useEffect } from "react";
import "../styles/Characters.css";

const Characters = () => {
  const [charactersList, setCharactersList] = useState([]);
  const [shuffleList, setShuffleList] = useState([]);
  const [memory, setMemory] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const loadingGame = (arr, num) => {
    const shuffledArr = arr.sort(() => 0.5 - Math.random());
    const result = shuffledArr.slice(0, num);
    return result;
  };
  const handleShuffling = (arr) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled;
  };

  const handleImgClick = (character) => {
    if (!memory.includes(character)) {
      setIsShuffling(true);
      setTimeout(() => {
        setMemory([...memory, character]);
        setShuffleList(handleShuffling(shuffleList));
        setTimeout(() => {
          setIsShuffling(false);
        }, 100);
      }, 1000);
    }
  };
  console.log(memory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://genshin.jmp.blue/characters/all");
        if (!response.ok) throw new Error("Fetch data failed");
        const data = await response.json();
        setCharactersList(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
    console.log(shuffleList);
  }, []);

  // make sure characters data is loaded before shuffling
  useEffect(() => {
    if (charactersList.length > 0) {
      setShuffleList(loadingGame(charactersList, 10));
    }
  }, [charactersList]);

  return (
    <div className="img-container">
      {shuffleList.map((chrter) => {
        return (
          <div
            className={isShuffling ? "card isShuffling" : "card"}
            key={chrter.id}
            onClick={() => {
              handleImgClick(chrter.id);
            }}
          >
            <div className="card__inner">
              <div className="card__front">
                <img
                  src={`https://genshin.jmp.blue/characters/${chrter.id}/portrait`}
                  alt={`${chrter.id}`}
                />
              </div>
              <div className="card__back">
                <img src="../assets/card_back.png" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
