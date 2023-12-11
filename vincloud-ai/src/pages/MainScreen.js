import React, { useEffect, useRef, useState } from "react";
import "../components//MainScreen.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { sendMessageToOpenAI } from "../services/services";
import SideBar from "../components/Sidebar";
import Chat from "../components/Chat";

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
    setInput("")
    const text = input;
    setShowMic(false);
    stopListening();
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

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleInput = (e) => {
    const trimmedValue = e.target.value?.replace(/^\s+/g, "");
    setInput(trimmedValue);
  };

  const startListening = () => {
    setInput("")
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
    <div className="container">
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
      />
    </div>
  );
}

export default MainScreen;
