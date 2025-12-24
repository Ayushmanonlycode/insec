import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;
  private from: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  }

  async sendWelcomeEmail(to: string, username: string) {
    try {
      await this.resend.emails.send({
        from: this.from,
        to: [to],
        subject: 'Welcome to ApniSec!',
        html: `<h1>Welcome, ${username}!</h1><p>Thank you for joining ApniSec. We are excited to have you on board.</p>`,
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // We don't want to fail registration if email fails
    }
  }
}
