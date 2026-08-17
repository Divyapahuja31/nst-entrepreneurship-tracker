import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {EmailLayout,EmailHeader,EmailFooter,ScoreCard,EvaluationDetails,CTAButton,} from "../components";

export interface EvaluationResultEmailProps {
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  evaluationName: string;
  dashboardUrl: string;
}

export const EvaluationResultEmail = ({
  studentName,
  score,
  totalMarks,
  percentage,
  evaluationName,
  dashboardUrl,
}: EvaluationResultEmailProps) => {
  return (
    <EmailLayout previewText="Your Entrepreneurship Evaluation Result is Ready">
      <EmailHeader />
      
      <Heading style={titleStyle}>Evaluation Completed</Heading>
      
      <Text style={introText}>Hi {studentName},</Text>
      
      <Text style={bodyText}>
        Your final evaluation for the NST Entrepreneurship Program has been completed.
        Your score has been reviewed and recorded as your final score for this evaluation.
      </Text>

      <ScoreCard
        score={score}
        totalMarks={totalMarks}
        percentage={percentage}
        status="FINAL & LOCKED"
      />

      <EvaluationDetails
        rows={[
          { label: "Evaluation", value: evaluationName },
          { label: "Status", value: "Final & Locked" },
        ]}
      />

      <Text style={bodyText}>
        You can view your complete evaluation and results from your dashboard.
      </Text>

      <CTAButton label="View Your Results" url={dashboardUrl} />

      <Text style={closingText}>
        If you have any questions regarding your evaluation, please reach out to your mentor.
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

const closingText = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "24px 0 0 0",
  lineHeight: "1.5",
};

