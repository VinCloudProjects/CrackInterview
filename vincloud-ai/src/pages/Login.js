import React, { useState } from "react";
import MultipleSelectChip from "../components/MultipleSelectChip";
import MuiSelect from "../components/MuiSelect";
import { Paper, Typography } from "@mui/material";
import { sendMessageToOpenAI } from "../services/services";

const skills = [
  "React",
  "React Native",
  "Next JS",
  "Bootstrap",
  "Material UI",
  "Tailwind CSS",
  "NodeJS",
  "HTML",
  "CSS",
  "Javascript",
];
const industryRoles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "DevOps Engineer",
  "System Administrator",
  "Database Administrator",
  "UI/UX Designer",
  "Product Manager",
  "Scrum Master",
  "Agile Coach",
  "Quality Assurance Engineer",
  "Test Automation Engineer",
  "Security Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Architect",
  "Technical Support Engineer",
  "Technical Writer",
  "Release Engineer",
  "IT Project Manager",
  "Business Analyst",
  "Enterprise Architect",
  "IT Consultant",
  "Sales Engineer",
  "Technical Evangelist",
  "DevRel (Developer Relations) Manager",
];

function Login({
  interviewContext,
  setInterviewContext,
  setShowInfo,
  input,
  setInput,
  setShowMic,
  stopListening,
  messages,
  setMessages,
  resetTranscript,
}) {
  const [errorText, setErrorText] = useState({
    role: false,
    designation: false,
    primarySkills: false,
  });

  const handleInputSend = async (inputText) => {
    setInput("");
    const text = inputText;
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

  const handleShowInfo = () => {
    let dummyError = {
      role: false,
      designation: false,
      primarySkills: false,
    };
    interviewContext.role.length === 0
      ? (dummyError.role = true)
      : (dummyError.role = false);
    interviewContext.designation.length === 0
      ? (dummyError.designation = true)
      : (dummyError.designation = false);
    interviewContext.primarySkills.length === 0
      ? (dummyError.primarySkills = true)
      : (dummyError.primarySkills = false);
    setErrorText(dummyError);
    if (
      interviewContext.role.length > 0 &&
      interviewContext.designation.length > 0 &&
      interviewContext.primarySkills.length > 0
    ) {
      setShowInfo(true);

      let primarySkillsLength = interviewContext.primarySkills.length;
      let secondarySkillsLength = interviewContext.secondarySkills.length;
      let additionalSkillsLength = interviewContext.additionalSkills.length;

      let text = `Present my role is ${
        interviewContext.role
      }, I have applied for the ${
        interviewContext.designation
      } role. And my primary ${
        primarySkillsLength === 1
          ? "skill is "
          : primarySkillsLength !== 0 && "skills are"
      } ${interviewContext.primarySkills.join(",") + ""}${
        secondarySkillsLength > 0
          ? secondarySkillsLength === 1
            ? ". Secondary skill is "
            : secondarySkillsLength !== 0 && ". Secondary skills are "
          : ""
      }${interviewContext.secondarySkills.join(",")}${
        additionalSkillsLength > 0
          ? additionalSkillsLength === 1
            ? " and additional skill is "
            : additionalSkillsLength !== 0 && " and additional skills are "
          : ""
      }${
        interviewContext.additionalSkills.join(",") + "."
      } Lets start an interview for ${interviewContext.designation}.`;
      setInput(text);
      handleInputSend(text);
    }
  };

  return (
    <div>
      <Paper
        sx={{
          padding: "2rem",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "3rem",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
          }}
          // variant="h4"
        >
          Interview AI
        </Typography>
        <MuiSelect
          label="Interview Role"
          items={industryRoles}
          selectedItems=""
          name="role"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
          required={true}
          errorText={errorText.role}
          setErrorText={setErrorText}
        />
        <MuiSelect
          label="Interview Designation"
          items={industryRoles}
          selectedItems=""
          name="designation"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
          required={true}
          errorText={errorText.designation}
          setErrorText={setErrorText}
        />
        <MultipleSelectChip
          label="Primary Skills"
          items={skills}
          selectedItems={[]}
          name="primarySkills"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
          required={true}
          errorText={errorText.primarySkills}
          setErrorText={setErrorText}
        />

        <MultipleSelectChip
          label="Secondary Skills"
          items={skills}
          selectedItems={[]}
          name="secondarySkills"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
          required={false}
        />

        <MultipleSelectChip
          label="Additional Skills"
          items={skills}
          selectedItems={[]}
          name="additionalSkills"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
          required={false}
        />
        <button onClick={handleShowInfo} className="startInterview">
          Start Interview
        </button>
      </Paper>
    </div>
  );
}

export default Login;
