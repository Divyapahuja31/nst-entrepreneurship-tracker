import * as React from "react";
import {Html,Head,Preview,Body,Container,Section,Heading,Text,Link,} from "@react-email/components";

interface EmailLayoutProps {
  previewText: string;
  children: React.ReactNode;
}

export const EmailLayout = ({ previewText, children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={mainBody}>
        <Container style={outerContainer}>
          {children}
        </Container>
      </Body>
    </Html>
  );
};

export const EmailHeader = () => {
  return (
    <Section style={headerSection}>
      <Text style={headerSub}>NEWTON SCHOOL OF TECHNOLOGY</Text>
      <Heading style={headerMain}>Entrepreneurship Program</Heading>
      <div style={headerDivider} />
    </Section>
  );
};

export const EmailFooter = () => {
  return (
    <Section style={footerSection}>
      <div style={footerDivider} />
      <Text style={footerTitle}>NST Entrepreneurship Program</Text>
      <Text style={footerText}>
        This is an automated notification from the NST Entrepreneurship Tracker.
      </Text>
      <Text style={footerNotice}>
        Please do not reply directly to this email. For questions, please reach out to your mentor.
      </Text>
    </Section>
  );
};

interface ScoreCardProps {
  score: number;
  totalMarks: number;
  percentage: number;
  status?: string;
}

export const ScoreCard = ({ score, totalMarks, percentage, status = "FINAL & LOCKED" }: ScoreCardProps) => {
  return (
    <Section style={scoreCardContainer}>
      <Text style={scoreCardLabel}>Final Score</Text>
      <Heading style={scoreDisplay}>
        {score} <span style={scoreTotal}>/ {totalMarks}</span>
      </Heading>
      <Text style={scorePercentage}>{percentage}%</Text>
      <div style={badgeWrapper}>
        <span style={badgeStyle}>{status}</span>
      </div>
    </Section>
  );
};

interface ActionCardProps {
  title: string;
  content: string;
  type: "warning" | "error" | "info";
}

export const ActionCard = ({ title, content, type }: ActionCardProps) => {
  const getStyle = () => {
    switch (type) {
      case "error":
        return {
          borderColor: "#fecaca",
          borderLeftColor: "#ef4444",
          backgroundColor: "#fef2f2",
          titleColor: "#991b1b",
          contentColor: "#7f1d1d",
        };
      case "warning":
        return {
          borderColor: "#fef3c7",
          borderLeftColor: "#d97706",
          backgroundColor: "#fffbeb",
          titleColor: "#92400e",
          contentColor: "#78350f",
        };
      default:
        return {
          borderColor: "#e5e7eb",
          borderLeftColor: "#c99b2e",
          backgroundColor: "#fafafa",
          titleColor: "#111827",
          contentColor: "#374151",
        };
    }
  };

  const style = getStyle();

  return (
    <Section
      style={{
        border: "1px solid",
        borderColor: style.borderColor,
        borderLeft: "4px solid",
        borderLeftColor: style.borderLeftColor,
        borderRadius: "8px",
        backgroundColor: style.backgroundColor,
        padding: "20px 24px",
        margin: "24px 0",
      }}
    >
      <Text
        style={{
          margin: "0 0 6px 0",
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase" as const,
          color: style.titleColor,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          margin: 0,
          fontSize: "14px",
          lineHeight: "1.5",
          color: style.contentColor,
        }}
      >
        {content}
      </Text>
    </Section>
  );
};

interface CTAButtonProps {
  label: string;
  url: string;
}

export const CTAButton = ({ label, url }: CTAButtonProps) => {
  return (
    <Section style={btnWrapper} align="center">
      <Link href={url} style={btnLink}>
        {label}
      </Link>
    </Section>
  );
};

interface DetailRow {
  label: string;
  value: string;
}

interface EvaluationDetailsProps {
  rows: DetailRow[];
}

export const EvaluationDetails = ({ rows }: EvaluationDetailsProps) => {
  return (
    <Section style={detailsContainer}>
      <Text style={detailsHeader}>Evaluation Details</Text>
      <table style={detailsTable}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={rowStyle}>
              <td style={labelCell}>{row.label}</td>
              <td style={valueCell}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

// Styles
const mainBody = {
  backgroundColor: "#f9fafb",
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "40px 20px",
  margin: 0,
};

const outerContainer = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "40px",
};

const headerSection = {
  paddingBottom: "24px",
  textAlign: "center" as const,
};

const headerSub = {
  margin: 0,
  fontSize: "11px",
  fontWeight: "bold",
  color: "#6b7280",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
};

const headerMain = {
  margin: "4px 0 0 0",
  fontSize: "20px",
  fontWeight: "700",
  color: "#111827",
};

const headerDivider = {
  height: "1px",
  backgroundColor: "#e5e7eb",
  marginTop: "24px",
};

const footerSection = {
  paddingTop: "24px",
  textAlign: "center" as const,
};

const footerDivider = {
  height: "1px",
  backgroundColor: "#e5e7eb",
  marginBottom: "24px",
};

const footerTitle = {
  margin: 0,
  fontSize: "13px",
  fontWeight: "bold",
  color: "#4b5563",
};

const footerText = {
  margin: "4px 0 0 0",
  fontSize: "12px",
  color: "#6b7280",
};

const footerNotice = {
  margin: "8px 0 0 0",
  fontSize: "11px",
  color: "#9ca3af",
  lineHeight: "1.4",
};

const scoreCardContainer = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "32px",
  textAlign: "center" as const,
  margin: "24px 0",
};

const scoreCardLabel = {
  margin: 0,
  fontSize: "11px",
  fontWeight: "bold",
  color: "#4b5563",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const scoreDisplay = {
  margin: "12px 0 4px 0",
  fontSize: "36px",
  fontWeight: "700",
  color: "#111827",
};

const scoreTotal = {
  fontSize: "20px",
  fontWeight: "400",
  color: "#6b7280",
};

const scorePercentage = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "700",
  color: "#c99b2e",
};

const badgeWrapper = {
  marginTop: "16px",
};

const badgeStyle = {
  backgroundColor: "#f0fdf4",
  color: "#166534",
  border: "1px solid #dcfce7",
  borderRadius: "9999px",
  padding: "4px 12px",
  fontSize: "11px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  display: "inline-block",
};

const btnWrapper = {
  margin: "32px 0",
};

const btnLink = {
  backgroundColor: "#c99b2e",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "14px 28px",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  textAlign: "center" as const,
};

const detailsContainer = {
  margin: "24px 0",
};

const detailsHeader = {
  margin: "0 0 12px 0",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#4b5563",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const detailsTable = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const rowStyle = {
  borderBottom: "1px solid #f3f4f6",
};

const labelCell = {
  padding: "10px 0",
  fontSize: "14px",
  color: "#6b7280",
  fontWeight: "500",
  width: "40%",
};

const valueCell = {
  padding: "10px 0",
  fontSize: "14px",
  color: "#111827",
  fontWeight: "600",
  textAlign: "right" as const,
};
