import React, { useEffect } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";
import userIcon from "../assets/user-icon.png";
import gptImageLogo from "../assets/chatgptLogo.svg";

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
    console.log(e.key);
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
              src={message.isBot ? gptImageLogo : userIcon}
              alt=""
            />
            <div
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html: message.text.replace(/\n/g, "<br />"),
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
              color="white"
              className="send-icon"
              fontSize="large"
              onClick={handleSend}
            />
          )}
        </div>

        <div className="buttonsGroup">
          <button
            className="startBtn"
            onClick={() => {
              showMic === false && startListening();
            }}
            style={{
              background: showMic ? "rgba(28, 30, 58, 1)" : "#5a4bff",
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

        <p>
          ChatGPT may produce inaccurate information about people, places, or
          facts, ChatGPT Augest 20 Version
        </p>
      </div>
    </div>
  );
}

export default Chat;
