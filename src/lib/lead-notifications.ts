/** Inbox list that receives every new website inquiry, in addition to the database row. */
export const LEAD_RECIPIENTS = ['mukundajmera94@gmail.com', 'ajmeramukund94@gmail.com'] as const;

const RESEND_API_URL = 'https://api.resend.com/emails';

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
 * Sends the inquiry to every address in LEAD_RECIPIENTS through Resend, one email per recipient.
 * Sending separately means one rejected address (for example, Resend's test sender only reaches the
 * account owner) does not block the others. Returns true when at least one email is accepted.
 * Callers keep the database row either way.
 */
export async function sendLeadEmail(lead: LeadEmailDetails): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !from) return false;

  const results = await Promise.all(
    LEAD_RECIPIENTS.map(async (recipient) => {
      try {
        const response = await fetch(RESEND_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from,
            to: [recipient],
            ...(lead.email ? { reply_to: lead.email } : {}),
            subject: `New website inquiry from ${lead.name}`,
            text: buildLeadEmailText(lead),
          }),
          signal: AbortSignal.timeout(10_000),
        });
        return response.ok;
      } catch {
        return false;
      }
    }),
  );

  return results.some(Boolean);
}
