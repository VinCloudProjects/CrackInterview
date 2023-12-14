import React from "react";
import MultipleSelectChip from "../components/MultipleSelectChip";
import MuiSelect from "../components/MuiSelect";
import { Button, Paper, Typography } from "@mui/material";

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
  setInput,
}) {
  const handleShowInfo = () => {
    if (
      Object.values(interviewContext).every((element) => element.length > 0)
    ) {
      setShowInfo(true);
      setInput(
        `Present my role is ${interviewContext.role}, I have applied for the ${
          interviewContext.designation
        }. And my primary skills ${interviewContext.primarySkills.join(
          ","
        )},secondary skills ${interviewContext.secondarySkills.join(
          ","
        )} and additional skills are ${interviewContext.additionalSkills.join(
          ","
        )} lets start an interview for ${interviewContext.designation}.`
      );
    }
  };

  return (
    <div>
      <Paper sx={{ padding: "2rem" }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
          }}
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
        />
        <MuiSelect
          label="Interview Designation"
          items={industryRoles}
          selectedItems=""
          name="designation"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
        />
        <MultipleSelectChip
          label="Primary Skills"
          items={skills}
          selectedItems={[]}
          name="primarySkills"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
        />

        <MultipleSelectChip
          label="Secondary Skills"
          items={skills}
          selectedItems={[]}
          name="secondarySkills"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
        />

        <MultipleSelectChip
          label="Additional Skills"
          items={skills}
          selectedItems={[]}
          name="additionalSkills"
          interviewContext={interviewContext}
          setInterviewContext={setInterviewContext}
        />
        <Button
          sx={{
            width: "100%",
            fontSize: "1.2rem",
            marginTop: "0.8rem",
            bgcolor: "#5a4bff",
          }}
          onClick={handleShowInfo}
          variant="contained"
        >
          Start Interview
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
