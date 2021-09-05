import React from "react";

interface IAddButtonProps {
  addHandler: (event: React.MouseEvent) => void;
}

function AddButton(props: IAddButtonProps) {
  return (
    <button type="button" onClick={props.addHandler}>
      <span role="img" aria-label="add">
        ➕
      </span>
    </button>
  );
}

export default AddButton;
