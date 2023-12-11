import React, { useEffect } from "react";
import messageIcon from "../assets/message.svg";

function SideBarButton({ handleQuery, value, message,lastQuestion }) {
  useEffect(() => {
    lastQuestion.current.scrollIntoView();
  }, [message,lastQuestion]);
  return (
    <button className="query" onClick={handleQuery} value={value}>
      <img src={messageIcon} alt="Query" />
      {message.isBot === false && truncateText(message.text, 25) + "?"}
    </button>
  );
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

export default SideBarButton;
