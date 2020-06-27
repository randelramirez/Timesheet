import React from 'react';

type AddButtonProps = {
  addHandler: (event: React.MouseEvent) => void;
};

const AddButton: React.FC<AddButtonProps> = (props: AddButtonProps) => {
  return (
    <button type="button" onClick={props.addHandler}>
      <span role="img" aria-label="add">
        ➕
      </span>
    </button>
  );
};

export default AddButton;
