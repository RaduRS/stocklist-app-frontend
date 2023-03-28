import React from "react";
import "./InfoBox.scss";

const InfoBox = ({
  title,
  count,
  icon,
  cardClass,
  onClick,
  checkboxProps,
  additionalContent,
}) => {
  return (
    <div className={`info-box`} onClick={onClick}>
      <h4 className={cardClass}>{count}</h4>
      <span className="info-text">
        {checkboxProps ? (
          <div className="outOfStock-container">
            <label className="cont" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={checkboxProps.checked}
                onChange={checkboxProps.onChange}
              />
              <span></span>
            </label>
          </div>
        ) : (
          <span className="info-icon">{icon}</span>
        )}
        <p>{title}</p>
        {additionalContent}
      </span>
    </div>
  );
};

export default InfoBox;
