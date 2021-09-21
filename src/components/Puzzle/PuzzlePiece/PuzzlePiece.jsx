import classes from "./PuzzlePiece.module.scss";

const PuzzlePiece = (props) => {
  return (
    <div
      className={classes.PuzzlePiece}
      draggable={props.draggable}
      onDragStart={(event) => props.onDragStart(event, props.id)}
      onDragOver={props.onDragOver}
      onDrop={(event) => props.onDrop(event, props.id)}
    >
      {props.value < 10 ? `0${props.value}` : props.value}
    </div>
  );
};

export default PuzzlePiece;
