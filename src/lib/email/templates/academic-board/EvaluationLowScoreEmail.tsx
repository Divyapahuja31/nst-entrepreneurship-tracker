import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {EmailLayout,EmailHeader,EmailFooter,EvaluationDetails,ActionCard,CTAButton,} from "../components";

export interface AcademicBoardLowScoreEmailProps {
  studentName: string;
  studentEmail: string;
  batch: string;
  score: number;
  totalMarks: number;
  percentage: number;
  mentorName: string;
  evaluationName: string;
  dashboardUrl: string;
}

export const AcademicBoardLowScoreEmail = ({
  studentName,
  studentEmail,
  batch,
  score,
  totalMarks,
  percentage,
  mentorName,
  evaluationName,
  dashboardUrl,
}: AcademicBoardLowScoreEmailProps) => {
  return (
    <EmailLayout previewText={`Academic Board Notification: ${studentName}'s Evaluation Score is Below 40%`}>
      <EmailHeader />

      <Heading style={titleStyle}>Academic Alert</Heading>

      <Text style={introText}>Hello Academic Board,</Text>

      <Text style={bodyText}>
        This is an automated notification regarding the final evaluation of a student in the NST Entrepreneurship Program.
        The score details have been locked in the system.
      </Text>

      <EvaluationDetails
        rows={[
          { label: "Student", value: `${studentName} (${studentEmail})` },
          { label: "Batch", value: batch },
          { label: "Evaluation", value: evaluationName },
          { label: "Final Score", value: `${score} / ${totalMarks} (${percentage}%)` },
          { label: "Mentor", value: mentorName },
          { label: "Status", value: "Final & Locked" },
        ]}
      />

      <ActionCard
        title="Attention Required"
        content="The student's final score is below the defined 40% threshold. The student's mentor has also been notified and will follow up with the student regarding this evaluation."
        type="error"
      />

      <CTAButton label="View Student Evaluation" url={dashboardUrl} />

      <Text style={footerNote}>
        This notification was generated automatically after the final score was locked.
      </Text>

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

const footerNote = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "24px 0 0 0",
  lineHeight: "1.5",
  textAlign: "center" as const,
};
