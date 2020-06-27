import React from 'react';

export type DeleteButtonProps = {
  deleteHandler: (event: React.MouseEvent) => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = (
  props: DeleteButtonProps
) => {
  return (
    <button onClick={props.deleteHandler} type="button">
      <span role="img" aria-label="delete">
        ❌
      </span>
    </button>
  );
};

export default DeleteButton;
