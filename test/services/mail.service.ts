import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import pug from "pug"
import path from 'path';

dotenv.config();

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

class MailService {
  private transporter: nodemailer.Transporter;
  private from: string;

  constructor() {
    const isDev = process.env.NODE_ENV !== 'production';

    const host = isDev ? process.env.DEV_EMAIL_HOST : process.env.PROD_EMAIL_HOST;
    const port = Number(isDev ? process.env.DEV_EMAIL_PORT : process.env.PROD_EMAIL_PORT);
    const user = isDev ? process.env.DEV_EMAIL_USERNAME : process.env.PROD_EMAIL_USER;
    const pass = isDev ? process.env.DEV_EMAIL_PASSWORD : process.env.PROD_EMAIL_PASS;
    this.from = isDev ? process.env.DEV_EMAIL_FROM || 'noreply@example.com' : process.env.PROD_EMAIL_FROM || 'noreply@example.com';

    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
      secure: port === 465,
    });

    console.log(`📧 [MailService] Transporter initialized: host=${host}, port=${port}, from=${this.from}`);

    this.transporter.verify((err, success) => {
      if (err) {
        console.error('❌ [MailService] SMTP verification failed:', err);
      } else {
        console.log('✅ [MailService] SMTP server is ready to send emails');
      }
    });
  }

  private renderTemplate(templateName: string, data: any): string {
    const templatePath = path.join(__dirname, '../views/emails', `${templateName}.pug`);
    return pug.renderFile(templatePath, data);
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    console.log(`📤 [MailService] Sending email to: ${options.to}, subject: "${options.subject}"`);

    try {
      await this.transporter.sendMail({
        from: this.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      console.log(`✅ [MailService] Email sent successfully to: ${options.to}`);
    } catch (error) {
      console.error(`❌ [MailService] Failed to send email to: ${options.to}`, error);
    }
  }

  async sendQuoteNotificationToAdmin(quoteData: any): Promise<void> {
    const subject = `New Quote Request from ${quoteData.firstName} ${quoteData.lastName}`;
    const to = process.env.ADMIN_EMAIL || 'admin@example.com';

    const html = this.renderTemplate('quote-notification', quoteData);
    const text = `New Quote Request:\n\nName: ${quoteData.firstName} ${quoteData.lastName}\nEmail: ${quoteData.email}\nPhone: ${quoteData.phone}\nLocation: ${quoteData.location}\nProject: ${quoteData.projectType}\nBudget: ${quoteData.budget}\nTimeline: ${quoteData.timeline}\nHas Plans?: ${quoteData.hasPlans ? 'Yes' : 'No'}\nNewsletter: ${quoteData.newsletter ? 'Yes' : 'No'}\n\nDescription:\n${quoteData.description}`;

    console.log(`📌 [MailService] Preparing to notify admin: ${to}`);
    await this.sendEmail({ to, subject, html, text });
  }
}

export const mailService = new MailService();

