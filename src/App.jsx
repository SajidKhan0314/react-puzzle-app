import { useState } from "react";

import classes from "./App.module.scss";
import Puzzle from "./components/Puzzle/Puzzle";

function App() {
  const [grids, setGrids] = useState("");
  const [showPuzzle, setShowPuzzle] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setShowPuzzle(true);
  };

  const resetGame = () => {
    setGrids("");
    setShowPuzzle(false);
  };

  let gridForm = (
    <form onSubmit={submitForm} className={classes.GridInputForm}>
      <label htmlFor="gridInput" className={classes.InputLabel}>
        Grids
      </label>
      <input
        value={grids}
        onChange={(e) => {
          setGrids(e.target.value);
        }}
        id="gridInput"
        type="number"
        placeholder="Enter a grid number"
      />
    </form>
  );

  let puzzle = null;

  if (showPuzzle) {
    gridForm = null;
    puzzle = <Puzzle grids={grids} resetGame={resetGame} />;
  }

  return (
    <div className={classes.Main}>
      <div className={classes.Header}>
        <h1 className={classes.HeaderTextPrimary}>Puzzle App</h1>
      </div>
      {gridForm}
      {puzzle}
    </div>
  );
}

export default App;
