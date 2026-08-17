import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {EmailLayout,EmailHeader,EmailFooter,EvaluationDetails,ActionCard,CTAButton,} from "../components";

export interface EvaluationFollowUpEmailProps {
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  evaluationName: string;
  dashboardUrl: string;
}

export const EvaluationFollowUpEmail = ({
  studentName,
  score,
  totalMarks,
  percentage,
  evaluationName,
  dashboardUrl,
}: EvaluationFollowUpEmailProps) => {
  return (
    <EmailLayout previewText={`Action Required: Connect with ${studentName} Regarding Evaluation`}>
      <EmailHeader />

      <Heading style={titleStyle}>Follow-up Discussion Required</Heading>

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
        title="Recommended Action"
        content={`Please connect with ${studentName} to discuss the evaluation, understand the areas that need support, and schedule a follow-up meeting.`}
        type="warning"
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
