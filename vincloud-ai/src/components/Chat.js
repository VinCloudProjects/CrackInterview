import React, { useEffect } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";

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
              src={
                message.isBot
                  ? "data:image/png;base64,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"
                  : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
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

        <p>
          Interview AI may produce inaccurate information about people, places,
          or facts
        </p>
      </div>
    </div>
  );
}

export default Chat;
