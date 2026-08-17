import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  EmailHeader,
  EmailFooter,
  EvaluationDetails,
  ActionCard,
  CTAButton,
} from "../components";

export interface EvaluationLowScoreEmailProps {
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  evaluationName: string;
  dashboardUrl: string;
}

export const EvaluationLowScoreEmail = ({
  studentName,
  score,
  totalMarks,
  percentage,
  evaluationName,
  dashboardUrl,
}: EvaluationLowScoreEmailProps) => {
  return (
    <EmailLayout previewText={`Attention Required: ${studentName}'s Evaluation Score is Below 40%`}>
      <EmailHeader />

      <Heading style={titleStyle}>Attention Required</Heading>

      <Text style={introText}>Hi Mentor,</Text>

      <Text style={bodyText}>
        {studentName}'s final evaluation for the NST Entrepreneurship Program has been completed.
        The score details have been locked in the system.
      </Text>

      <EvaluationDetails
        rows={[
          { label: "Student", value: studentName },
          { label: "Evaluation", value: evaluationName },
          { label: "Final Score", value: `${score} / ${totalMarks} (${percentage}%)` },
          { label: "Status", value: "Final & Locked" },
        ]}
      />

      <ActionCard
        title="Attention Required"
        content={`The student's final score is below the defined 40% threshold. Please review the student's evaluation and connect with ${studentName} to understand the areas requiring support and determine the appropriate next steps. The Academic Board has also been notified regarding this evaluation.`}
        type="error"
      />

      <CTAButton label="View Student Evaluation" url={dashboardUrl} />

      <EmailFooter />
    </EmailLayout>
  );
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#111827",
  margin: "0 0 20px 0",
};

const introText = {
  fontSize: "16px",
  color: "#1f2937",
  margin: "0 0 16px 0",
  lineHeight: "1.5",
};

const bodyText = {
  fontSize: "15px",
  color: "#4b5563",
  margin: "0 0 16px 0",
  lineHeight: "1.5",
};
