import React from "react";
import "./BookmarkHistory.scss";

function ButtonGroup(props) {
  const { selected } = props;
  return (
    <div
      className={`history-button-group ${
        selected ? "history-button-group--selected" : ""
      }`}
    >
      <button className="history-button-group___value">{props.children}</button>
      <button className="history-button-group___clear"> x</button>
    </div>
  );
}

function Title(props) {
  return <div className="history-title">{props.children}</div>;
}

function BookmarkHistory(props) {
  const { current, history, className } = props;
  return (
    <div className={`bookmark-history ${className}`}>
      <Title>Bookmarks history</Title>
      <ul className="bookmark-history__list">
        {history.map((bookmark) => (
          <li key={bookmark.id} className="bookmark-history__list__row">
            <ButtonGroup selected={current === bookmark.id}>{bookmark.time}</ButtonGroup>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkHistory;
