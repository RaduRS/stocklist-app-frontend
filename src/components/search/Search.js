import React, { useRef, useState } from "react";
import "./Search.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  const inputRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIconClick = () => {
    setIsExpanded(true);
    inputRef.current.focus();
  };

  const handleInputBlur = () => {
    setIsExpanded(false);
  };

  return (
    <div className="container-search">
      <input
        ref={inputRef}
        placeholder="search product"
        value={value}
        onChange={onChange}
        className={`input ${isExpanded ? "expanded" : ""}`}
        name="text"
        type="text"
        onBlur={handleInputBlur}
      />
      <div
        className={`icon ${isExpanded ? "clicked" : ""}`}
        onClick={handleIconClick}
      >
        <svg
          viewBox="0 0 512 512"
          className="ionicon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Search</title>
          <path
            strokeWidth="32"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
          ></path>
          <path
            d="M338.29 338.29L448 448"
            strokeWidth="32"
            strokeMiterlimit="10"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Search;
