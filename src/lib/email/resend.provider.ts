import { Resend } from "resend";
import type { EmailProvider } from "./email.types";

export class ResendProvider implements EmailProvider {
  private resend: Resend;
  private fromAddress: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable. Add it to your server configuration.");
    }
    if (!from) {
      throw new Error("Missing EMAIL_FROM environment variable. Add it to your server configuration.");
    }

    this.resend = new Resend(apiKey);
    this.fromAddress = from;
  }

  async sendEmail(params: {
    to: string | string[];
    subject: string;
    html: string;
  }): Promise<{ messageId?: string; error?: string }> {
    try {
      const response = await this.resend.emails.send({
        from: this.fromAddress,
        to: params.to,
        subject: params.subject,
        html: params.html,
      });

      if (response.error) {
        return { error: response.error.message || JSON.stringify(response.error) };
      }

      return { messageId: response.data?.id };
    } catch (err: any) {
      return { error: err.message || String(err) };
    }
  }
}
