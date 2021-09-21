import { useEffect, useState } from "react";
import classes from "./Puzzle.module.scss";
import PuzzlePiece from "./PuzzlePiece/PuzzlePiece";

const Puzzle = (props) => {
  const { resetGame } = props;
  let boxNumber = -1;
  let [arrayIsShuffled, setArrayIsShuffled] = useState(false);
  const comparingArray = Array.from(
    { length: props.grids * props.grids },
    (_, i) => i + 1
  );

  const [boxes, setBoxes] = useState(
    Array.from({ length: props.grids * props.grids }, (_, i) => {
      return {
        id: Math.random(1000),
        name: `Box${i + 1}`,
        value: i + 1,
      };
    })
  );

  const shuffle = (sourceArray) => {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  };

  const swapBoxes = (fromBox, toBox) => {
    let fromIndex = -1;
    let toIndex = -1;

    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].id === fromBox.id) {
        fromIndex = i;
      }
      if (boxes[i].id === toBox.id) {
        toIndex = i;
      }
    }

    if (fromIndex !== -1 && toIndex !== -1) {
      const { fromId, ...updatedFromBox } = { ...boxes[toIndex] };
      const { toId, ...updatedToBox } = { ...boxes[fromIndex] };

      let updatedboxes = [...boxes];
      updatedboxes[fromIndex] = { id: toBox.id, ...updatedFromBox };
      updatedboxes[toIndex] = { id: fromBox.id, ...updatedToBox };

      setBoxes(updatedboxes);
    }
  };

  const dragStartHandler = (event, data) => {
    let fromBox = JSON.stringify({ id: data });
    event.dataTransfer.setData("dragContent", fromBox);
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    return false;
  };

  const onDropHandler = (event, data) => {
    event.preventDefault();
    let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toBox = { id: data };

    swapBoxes(fromBox, toBox);
    return false;
  };

  useEffect(() => {
    setBoxes((oldState) => shuffle([...oldState]));
    setArrayIsShuffled(true);
  }, []);

  useEffect(() => {
    let arraysAreEqual = boxes
      .map((box) => box.value)
      .every((element, index) => element === comparingArray[index]);

    if (arraysAreEqual && arrayIsShuffled) {
      alert("Welcome to the team!");
      resetGame();
    }
  }, [resetGame, boxes, comparingArray, arrayIsShuffled]);

  return (
    <div className={classes.Puzzle}>
      <h2>Place the pieces in order</h2>
      <div className={classes.PuzzleBox}>
        {Array.from(Array(parseInt(props.grids)).keys()).map((i) => (
          <div key={boxes[i].id} className={classes.Row}>
            {Array.from(Array(parseInt(props.grids)).keys()).map((j) => {
              boxNumber += 1;
              return (
                <PuzzlePiece
                  key={boxes[boxNumber].id}
                  {...boxes[boxNumber]}
                  draggable={true}
                  onDragStart={dragStartHandler}
                  onDragOver={dragOverHandler}
                  onDrop={onDropHandler}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
