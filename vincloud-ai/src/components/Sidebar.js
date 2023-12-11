import React, { useRef } from "react";
import gptLogo from "../assets/chatgpt.svg";
import addBtn from "../assets/add-30.png";
import home from "../assets/home.svg";
import saved from "../assets/bookmark.svg";
import rocket from "../assets/rocket.svg";
import SideBarButton from "./SideBarButton";

function SideBar({ messages, handleQuery }) {
  const lastQuestion = useRef(null);

  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={gptLogo} alt="Logo" className="logo" />
          <span className="brand">Vincloud AI</span>
        </div>

        <button
          className="midBtn"
          onClick={() => {
            window.location.reload();
          }}
        >
          <img src={addBtn} alt="new chat" className="addBtn" />
          New Chat
        </button>

        <div className="upperSideBottom">
          {messages.map(
            (message, i) =>
              i > 0 &&
              message.isBot === false && (
                <SideBarButton
                  handleQuery={handleQuery}
                  value={message.text}
                  key={i}
                  message={message}
                  lastQuestion={lastQuestion}
                />
              )
          )}
          <div ref={lastQuestion}></div>
        </div>
      </div>
      <div className="lowerSide">
        <div className="listItems">
          <img src={home} alt="" className="listItemsImg" />
          Home
        </div>
        <div className="listItems">
          <img src={saved} alt="" className="listItemsImg" />
          Saved
        </div>
        <div className="listItems">
          <img src={rocket} alt="" className="listItemsImg" />
          Upgrade to Pro
        </div>
      </div>
    </div>
  );
}

export default SideBar;
