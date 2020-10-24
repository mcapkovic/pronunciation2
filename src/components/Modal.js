import React from "react";
import "./Modal.scss";

function Modal(props) {
  const { children, className } = props;
  return (
    <div className={"modal " + className}>
      <div className="modal__content">{children}</div>
    </div>
  );
}

export default Modal;
