import axios from "axios";

const chatAPI =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

export const sendMessageToOpenAI = async (text) => {
  try {
    const response = await axios.post(
      chatAPI,
      {
        prompt: text,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error(
      "Error sending message to OpenAI:",
      error.response.data.error.message
    );
  }
};
