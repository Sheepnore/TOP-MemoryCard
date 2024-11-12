import { useState, useEffect } from "react";
import "../styles/Characters.css";

const Characters = ({ setScores }) => {
  const [charactersList, setCharactersList] = useState([]);
  const [shuffleList, setShuffleList] = useState([]);
  const [memory, setMemory] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLoading, setIsLoading] = useState();

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
      setScores((prev) => prev + 1);
      setTimeout(() => {
        setMemory([...memory, character]);
        setShuffleList(handleShuffling(shuffleList));

        // wait for the shuffling done, otherwise the transition won't apply on all cards.
        setTimeout(() => {
          setIsShuffling(false);
        }, 100);
      }, 800);
    } else {
      setIsShuffling(true);
      setScores(0);
      setTimeout(() => {
        setMemory([]);
        setShuffleList(handleShuffling(shuffleList));
        setTimeout(() => {
          setIsShuffling(false);
        }, 100);
      }, 1800);
    }
  };
  console.log(memory);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("https://genshin.jmp.blue/characters/all");
        if (!response.ok) throw new Error("Fetch data failed");
        const data = await response.json();
        setCharactersList(data);
        setIsLoading(false);
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
    <>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
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
      )}
    </>
  );
};

export default Characters;
