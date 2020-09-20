import React from "react";
import "./SearchLayout.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayNightSwitch from "../../components/DayNightSwitch";

function SearchLayout(props) {
  const [value, setValue] = React.useState("");

  const addUrl = React.useCallback(() => {
    document.location.search = value
      ? "url=" + value
      : "url=https://youtu.be/ZTgYjGXFAkw";
  }, [value]);

  const editValue = React.useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  return (
    <div className="search-page">
      <h1 className="search-page__title">
        Hello, paste an YouTube url to the input.
      </h1>
      <div className="search-page__search">
        <input
          className="search-page__search__input"
          value={value}
          onChange={editValue}
          placeholder="https://youtu.be/ZTgYjGXFAkw"
        />
        <button className="search-page__search__button" onClick={addUrl}>
          <FontAwesomeIcon size="lg" icon={faArrowRight} />
        </button>
      </div>
      <div style={{ display: "none" }}>
        <DayNightSwitch />
      </div>
    </div>
  );
}

export default SearchLayout;
