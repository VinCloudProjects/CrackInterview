import React, { useEffect, useRef, useState } from "react";
import "../components//MainScreen.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { sendMessageToOpenAI } from "../services/services";
import SideBar from "../components/Sidebar";
import Chat from "../components/Chat";
import Login from "./Login";
import { Box } from "@mui/material";

function MainScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "ChatGPT is a language model developed by OpenAI, based on the GPT-3.5 architecture. GPT stands for Generative Pre-trained Transformer, and it's a type of artificial intelligence model designed for natural language processing tasks.",
      isBot: true,
    },
  ]);

  const [showMic, setShowMic] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [interviewContext, setInterviewContext] = useState({
    role: "",
    designation: "",
    primarySkills: [],
    secondarySkills: [],
    additionalSkills: [],
  });
  const [showInfo, setShowInfo] = useState(false);

  let { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  const msgEnd = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  useEffect(() => {
    if (isRecording) {
      resetTranscript();
    }
  }, [isRecording, resetTranscript]);

  const handleSend = async () => {
    setInput("");
    const text = input;
    setShowMic(false);
    stopListening();
    setMessages([...messages, { text: text, isBot: false }]);
    const res = sendMessageToOpenAI(text);
    res.then((res) => {
      resetTranscript();
      setMessages([
        ...messages,
        { text: text, isBot: false },
        { text: res, isBot: true },
      ]);
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleInput = (e) => {
    const trimmedValue = e?.target?.value?.replace(/^\s+/g, "");
    setInput(trimmedValue);
  };

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
    setInput(transcript);
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setShowMic(false);
    }, 100000);
    setShowMic(true);
    setIsRecording(true);
    inputRef.current.focus();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setShowMic(false);
    setIsRecording(false);
  };

  const handleQuery = async (e) => {
    setInput("");
    const text = e.target.value;
    setMessages([...messages, { text: text, isBot: false }]);
    const res = sendMessageToOpenAI(text);
    res.then((res) => {
      setMessages([
        ...messages,
        { text: text, isBot: false },
        { text: res, isBot: true },
      ]);
    });
  };

  return (
    <div>
      {showInfo ? (
        <Box className="container">
          <SideBar messages={messages} handleQuery={handleQuery} />
          <Chat
            messages={messages}
            msgEnd={msgEnd}
            handleSend={handleSend}
            handleInput={handleInput}
            input={input}
            showMic={showMic}
            startListening={startListening}
            stopListening={stopListening}
            inputRef={inputRef}
            resetTranscript={resetTranscript}
          />
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="login"
        >
          <Login
            interviewContext={interviewContext}
            setInterviewContext={setInterviewContext}
            setShowInfo={setShowInfo}
            setInput={setInput}
            handleSend = {handleSend}
          />
        </Box>
      )}
    </div>
  );
}

export default MainScreen;
