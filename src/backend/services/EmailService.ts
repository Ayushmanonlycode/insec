import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;
  private from: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.resend = new Resend(apiKey);
    this.from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    
    if (!apiKey) {
      console.warn('[EmailService] RESEND_API_KEY is missing from environment');
    } else {
      console.log('[EmailService] Resend initialized with key:', apiKey.slice(0, 7) + '...');
    }
  }

  async sendWelcomeEmail(to: string, username: string) {
    try {
      console.log(`[EmailService] Attempting to send welcome email to: ${to}`);
      const { data, error } = await this.resend.emails.send({
        from: this.from,
        to: [to],
        subject: 'Establishment Success | ApniSec',
        html: `
          <div style="font-family: sans-serif; background: black; color: white; padding: 40px; border: 1px solid #333;">
            <h1 style="color: #00FFB2; text-transform: uppercase; letter-spacing: 2px;">Identity established</h1>
            <p style="color: #888; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Welcome to the network, ${username}.</p>
            <p>Your uplink is active. Access the command center to begin deployments.</p>
            <div style="margin-top: 40px; border-top: 1px solid #222; padding-top: 20px;">
              <p style="font-size: 10px; color: #444;">APNISEC | SECURE CORE</p>
            </div>
          </div>
        `,
      });
      if (error) console.error('[EmailService] Resend error:', error);
      else console.log('[EmailService] Resend dispatch success:', data);
    } catch (error) {
      console.error('[EmailService] Failed to send welcome email:', error);
    }
  }

  async sendIssueNotification(to: string, issue: { type: string, title: string, description: string }) {
    try {
      console.log(`[EmailService] Sending issue notification to: ${to}`);
      const { data, error } = await this.resend.emails.send({
        from: this.from,
        to: [to],
        subject: `NEW VULNERABILITY REPORT | ${issue.type.toUpperCase()}`,
        html: `
          <div style="font-family: sans-serif; background: black; color: white; padding: 40px; border: 1px solid #333;">
            <h1 style="color: #FF3333; text-transform: uppercase; letter-spacing: 2px;">Deployment Warning</h1>
            <div style="background: #111; padding: 20px; border-left: 4px solid #FF3333; margin: 20px 0;">
              <p style="color: #FF3333; font-weight: bold;">${issue.type}</p>
              <h2 style="margin: 10px 0;">${issue.title}</h2>
              <p style="color: #888;">${issue.description}</p>
            </div>
            <p style="font-size: 12px; color: #666;">View full intelligence in the dashboard.</p>
          </div>
        `,
      });
      if (error) console.error('[EmailService] Issue notification failed:', error);
    } catch (error) {
      console.error('[EmailService] Failed to send issue email:', error);
    }
  }

  async sendProfileUpdateNotification(to: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.from,
        to: [to],
        subject: 'SECURITY ALERT | Profile Modification Detected',
        html: `
          <div style="font-family: sans-serif; background: black; color: white; padding: 40px; border: 1px solid #333;">
            <h1 style="color: #00FFB2; text-transform: uppercase; letter-spacing: 2px;">Security Update</h1>
            <p>Your account profile information was modified successfully.</p>
            <p style="color: #444; font-size: 12px;">If you did not perform this action, please reset your password immediately.</p>
          </div>
        `,
      });
      if (error) console.error('[EmailService] Profile update notification failed:', error);
    } catch (error) {
      console.error('[EmailService] Failed to send profile email:', error);
    }
  }
}
