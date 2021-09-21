import classes from "./PuzzlePiece.module.scss";

const PuzzlePiece = (props) => {
  return (
    <div
      className={classes.PuzzlePiece}
      draggable={props.draggable}
      onDragStart={(event) => props.onDragStart(event, props.id)}
      onDragOver={props.onDragOver}
      onDrop={(event) => props.onDrop(event, props.id)}

      // onDragOver={(event) => {
      //   console.log(event);
      // }}
      // onDrop={(event) => {
      //   console.log(event);
      // }}
    >
      {props.value}
    </div>
  );
};

export default PuzzlePiece;
