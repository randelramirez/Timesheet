import React from "react";

export interface IDeleteButtonProps {
  deleteHandler: (event: React.MouseEvent) => void;
}

function DeleteButton(props: IDeleteButtonProps) {
  return (
    <button onClick={props.deleteHandler} type="button">
      <span role="img" aria-label="delete">
        ❌
      </span>
    </button>
  );
}

export default DeleteButton;
