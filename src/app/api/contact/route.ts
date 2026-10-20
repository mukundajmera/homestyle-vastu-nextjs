import { NextResponse } from 'next/server';
import { z } from 'zod';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').max(20),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  location: z.string().min(2, 'City/Location is required').max(100),
  type: z.enum(['residential', 'commercial'], {
    required_error: 'Please select a service type',
  }),
  format: z.enum(['onsite', 'online'], {
    required_error: 'Please select a consultation format',
  }),
  inquiry: z.string().max(1000).optional().or(z.literal('')),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true }); // Silently reject bots
    }

    const validatedData = contactSchema.parse(body);

    let connection;
    let dbSuccess = false;
    let mailSuccess = false;

    // Database Insertion
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [result] = await connection.execute(
        `INSERT INTO leads (name, phone, email, location, type, format, inquiry)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          validatedData.name,
          validatedData.phone,
          validatedData.email || null,
          validatedData.location,
          validatedData.type,
          validatedData.format,
          validatedData.inquiry || null,
        ]
      );

      dbSuccess = true;
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Depending on requirements, we might want to fail the whole request if DB fails.
      // But we will return 500 if DB fails as it's our primary persistent storage.
      return NextResponse.json(
        { error: 'Failed to save your inquiry. Please try calling us instead.' },
        { status: 500 }
      );
    } finally {
      if (connection) {
        await connection.end();
      }
    }

    // Email Notification
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: process.env.LEAD_NOTIFICATION_EMAIL,
          subject: `New Lead: ${validatedData.name} - ${validatedData.type} Vastu`,
          text: `
New lead received:
Name: ${validatedData.name}
Phone: ${validatedData.phone}
Email: ${validatedData.email || 'Not provided'}
Location: ${validatedData.location}
Type: ${validatedData.type}
Format: ${validatedData.format}
Inquiry: ${validatedData.inquiry || 'None'}
          `,
        };

        await transporter.sendMail(mailOptions);
        mailSuccess = true;
      } else {
        console.warn('SMTP configuration is missing, skipping email notification.');
      }
    } catch (mailError) {
      console.error('Email error:', mailError);
      // We don't fail the request if email fails, but we record the failure state.
    }

    return NextResponse.json({
      success: true,
      dbSuccess,
      mailSuccess,
      message: 'Successfully submitted'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
