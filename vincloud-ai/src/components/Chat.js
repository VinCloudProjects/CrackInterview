import React, { useEffect } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";
import roboImage from "../assets/robo.png"
import userImage from "../assets/userImage.png"

function Chat({
  messages,
  msgEnd,
  handleSend,
  handleInput,
  input,
  showMic,
  startListening,
  stopListening,
  inputRef,
  resetTranscript,
}) {
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages, msgEnd]);

  useEffect(() => {
    inputRef.current.scrollTop = inputRef.current.scrollHeight;
  }, [input, inputRef]);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
    if (e.key === "Backspace") {
      await resetTranscript();
    }
  };

  return (
    <div className="main">
      <div className="chats">
        {messages.map((message, i) => (
          <div key={i} className={message.isBot ? "chat bot" : "chat"}>
            <img
              className="chatImg"
              src={
                message.isBot
                  ? roboImage
                  : userImage
              }
              alt=""
            />
            <div
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html: message.isBot
                  ? message.text.slice(2).replace(/\n/g, "<br />")
                  : message.text.replace(/\n/g, "<br />"),
              }}
              className="txt"
            ></div>
          </div>
        ))}
        <div ref={msgEnd}></div>
      </div>
      <div className="chatFooter">
        <div className="inp">
          <textarea
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="Send message ..."
            onKeyDown={handleEnter}
            ref={inputRef}
          />

          {input.length > 0 && (
            <SendIcon
              className="send-icon"
              fontSize="large"
              onClick={handleSend}
            />
          )}
        </div>

        <div className="buttonsGroup">
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            New Chat
          </button>
          <button
            className="startBtn"
            onClick={() => {
              showMic === false && startListening();
            }}
            style={{
              background: showMic ? "gray" : "#5a4bff",
            }}
          >
            {showMic === false ? (
              "Start Listening"
            ) : (
              <>
                <KeyboardVoiceIcon />
                &nbsp; Listening
              </>
            )}
          </button>
          <button
            className="stopBtn"
            onClick={() => {
              stopListening();
            }}
          >
            Stop Listening
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default Chat;
