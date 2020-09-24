import React from "react";
import "./TooltipDescription.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

function TooltipDescription(props) {
  const { children, tooltip, className } = props;
  return (
    <div className={"tooltip-description " + className}>
      {children}

      {tooltip && (
        <div data-tooltip={tooltip} className="tooltip-description__tooltip">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      )}
    </div>
  );
}

export default TooltipDescription;
