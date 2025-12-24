// lib/backend/services/EmailService.ts

import { Resend } from "resend";
import { IIssue } from "@/lib/models/Issue";

export class EmailService {
  private resend: Resend;
  private fromEmail: string = "onboarding@resend.dev"; // Change this to your verified domain

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not defined");
    }
    this.resend = new Resend(apiKey);
  }

  public async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: "Welcome to ApniSec - Your Security Partner",
        html: this.getWelcomeEmailTemplate(name),
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      // Don't throw error - email failure shouldn't break registration
    }
  }

  public async sendIssueCreatedEmail(
    email: string,
    name: string,
    issue: Partial<IIssue>
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: `New Issue Created: ${issue.title}`,
        html: this.getIssueCreatedTemplate(name, issue),
      });
      console.log(`Issue notification sent to ${email}`);
    } catch (error) {
      console.error("Error sending issue notification:", error);
    }
  }

  public async sendProfileUpdateEmail(
    email: string,
    name: string
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: "Profile Updated Successfully",
        html: this.getProfileUpdateTemplate(name),
      });
      console.log(`Profile update notification sent to ${email}`);
    } catch (error) {
      console.error("Error sending profile update email:", error);
    }
  }

  private getWelcomeEmailTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ Welcome to ApniSec</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>Welcome to ApniSec - Your trusted cybersecurity partner. We're excited to have you on board!</p>
              <p>With ApniSec, you can:</p>
              <ul>
                <li>🔒 Manage Cloud Security issues</li>
                <li>📊 Track Reteam Assessments</li>
                <li>🔍 Monitor VAPT activities</li>
                <li>📈 View comprehensive security dashboards</li>
              </ul>
              <p>Get started by logging in to your dashboard:</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Go to Dashboard</a>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Best regards,<br>The ApniSec Team</p>
            </div>
            <div class="footer">
              <p>© 2025 ApniSec. All rights reserved.</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getIssueCreatedTemplate(
    name: string,
    issue: Partial<IIssue>
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .issue-card { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 5px; }
            .badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .badge-cloud { background: #e3f2fd; color: #1976d2; }
            .badge-reteam { background: #f3e5f5; color: #7b1fa2; }
            .badge-vapt { background: #fff3e0; color: #e65100; }
            .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Issue Created</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>A new security issue has been created in your ApniSec account:</p>
              <div class="issue-card">
                <p><span class="badge badge-${
                  issue.type
                }">${this.formatIssueType(issue.type!)}</span></p>
                <h3>${issue.title}</h3>
                <p><strong>Description:</strong></p>
                <p>${issue.description}</p>
                <p><strong>Priority:</strong> ${issue.priority || "Medium"}</p>
                <p><strong>Status:</strong> ${issue.status || "Open"}</p>
              </div>
              <p>You can manage this issue from your dashboard.</p>
              <p>Best regards,<br>The ApniSec Team</p>
            </div>
            <div class="footer">
              <p>© 2025 ApniSec. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getProfileUpdateTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Profile Updated</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>Your ApniSec profile has been successfully updated.</p>
              <p>If you didn't make this change, please contact our support team immediately.</p>
              <p>Best regards,<br>The ApniSec Team</p>
            </div>
            <div class="footer">
              <p>© 2025 ApniSec. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private formatIssueType(type: string): string {
    const types: { [key: string]: string } = {
      "cloud-security": "Cloud Security",
      "reteam-assessment": "Reteam Assessment",
      vapt: "VAPT",
    };
    return types[type] || type;
  }
}
