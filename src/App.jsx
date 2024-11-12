import { useEffect, useState } from "react";
import Characters from "./components/Characters";
import "./App.css";

function App() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [scores, setScores] = useState(0);
  const [bestScores, setBestScores] = useState(0);

  useEffect(() => {
    if (bestScores <= scores) {
      setBestScores(scores);
    }
  }, [scores]);

  return (
    <>
      {isGameStart ? (
        <>
          <div className="currentScores">Scores:{scores}</div>
          <div className="bestScores">Best Scores:{bestScores} </div>
          <Characters setScores={setScores} scores={scores} />
        </>
      ) : (
        <>
          <div className="startingText">
            Genshin Impact Memory Card: See if you can remember all characters!
          </div>
          <button
            onClick={() => {
              setIsGameStart(true);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
          >
            Game Start!
          </button>
        </>
      )}
    </>
  );
}

export default App;
