import React from 'react';

type AddButtonProps = {
  addHandler: (event: React.MouseEvent) => void;
};

function AddButton(props: AddButtonProps) {
  return (
    <button type="button" onClick={props.addHandler}>
      <span role="img" aria-label="add">
        ➕
      </span>
    </button>
  );
}

export default AddButton;
