import { useState } from "react";
import Characters from "./components/Characters";
import "./App.css";

function App() {
  const [isGameStart, setIsGameStart] = useState(false);
  return (
    <>
      {isGameStart ? (
        <Characters />
      ) : (
        <>
          <div className="startingText">
            Genshin Impact Memory Card: See if you can remember all characters!
          </div>
          <button
            onClick={() => {
              setIsGameStart(true);
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
