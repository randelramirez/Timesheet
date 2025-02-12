import React from "react";
import { CSSTransition } from "react-transition-group";

type AnimationContainerProps = {};

function AnimationContainer(props: any) {
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={500}
      classNames="timesheet-entry"
      {...props}
    >
      <div ref={nodeRef}>{props.children}</div>
    </CSSTransition>
  );
}

export default AnimationContainer;
