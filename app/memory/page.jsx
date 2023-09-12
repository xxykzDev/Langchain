// start here
"use client";
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import TwoColumnsLayout from "../components/TwoColumnLayout";
import ResultWithSources, { useClient } from "../components/ResultWithSources";
import "../globals.css";

const Memory = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Hey como estas? queres charlar?",
      type: "bot",
    },
  ]);

  const [firstMsg, setFirstMsg] = useState(true);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmitPrompt = async () => {
    console.log("sending: ", prompt);
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: prompt,
          type: "user",
          sourceDocuments: null,
        },
      ]);
      const response = await fetch("./api/memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt, firstMsg }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error, Status: ${response.status}`);
      }

      setPrompt("");
      setFirstMsg(false);
      const searchRes = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: searchRes.output.response, type: "bot", sourceDocuments: null },
      ]);

      console.log({ searchRes });
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Title headingText={"Memory"} />
      <TwoColumnsLayout
        leftChildren={
          <>
            <PageHeader
              heading="I remember everything"
              boldText="Lets try if i can remember your favourite food and name!"
              description="This tool uses buffer memory and conversation chain. Head over module x to get started"
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="brain" />
            <PromptBox
              prompt={prompt}
              handleSubmit={handleSubmitPrompt}
              error={error}
              handlePromptChange={handlePromptChange}
              pngFile=""
            />
          </>
        }
      />
    </>
  );
};
export default Memory;
