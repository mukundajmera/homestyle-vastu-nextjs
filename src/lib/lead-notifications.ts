/** Inbox list that receives every new website inquiry, in addition to the database row. */
export const LEAD_RECIPIENTS = ['mukundajmera94@gmail.com', 'ajmeramukund94@gmail.com'] as const;

import nodemailer from 'nodemailer';

export type LeadEmailDetails = {
  name: string;
  phone: string;
  email?: string;
  location: string;
  type: string;
  serviceInterest: string;
  format: string;
  inquiry?: string;
  submissionId: string;
};

function buildLeadEmailText(lead: LeadEmailDetails) {
  return [
    'A new inquiry was submitted on the website.',
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email ?? 'Not given'}`,
    `City/Location: ${lead.location}`,
    `Property category: ${lead.type}`,
    `Service interest: ${lead.serviceInterest}`,
    `Preferred format: ${lead.format}`,
    '',
    'Guidance requested:',
    lead.inquiry ?? 'Not given',
    '',
    `Submission ID: ${lead.submissionId}`,
  ].join('\n');
}

/**
 * Sends the inquiry to every address in LEAD_RECIPIENTS through the Hostinger mailbox in SMTP_*.
 * Returns false when email is not configured or the send fails; callers keep the database row either way.
 */
export async function sendLeadEmail(lead: LeadEmailDetails): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!host || !user || !pass || !from) return false;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      socketTimeout: 10_000,
    });
    await transporter.sendMail({
      from,
      to: [...LEAD_RECIPIENTS],
      ...(lead.email ? { replyTo: lead.email } : {}),
      subject: `New website inquiry from ${lead.name}`,
      text: buildLeadEmailText(lead),
    });
    return true;
  } catch {
    return false;
  }
}
