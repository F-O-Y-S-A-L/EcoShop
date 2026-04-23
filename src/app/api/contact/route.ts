import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { EMAIL, PASSWORD } = process.env;

    if (!EMAIL || !PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Message logged (SMTP not configured for real emails).',
        simulated: true,
      });
    }

    // Transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD, // এখানে অবশ্যই Gmail App Password ব্যবহার করতে হবে
      },
    });

    // Mail options
    const mailOptions = {
      from: `"${name}" <${EMAIL}>`,
      to: EMAIL,
      replyTo: email,
      subject: `New Contact Mission: ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 24px; color: #1a1a1a;">
          <div style="background-color: #ff5c00; color: white; padding: 12px 24px; border-radius: 100px; display: inline-block; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 24px;">
            Inbound Transmission
          </div>
          
          <h1 style="font-size: 32px; font-weight: 800; font-style: italic; letter-spacing: -0.04em; margin-bottom: 8px;">
            MISSION <span style="color: #ff5c00;">RECEIVED.</span>
          </h1>
          
          <p style="color: #666; font-size: 14px; margin-bottom: 32px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">
            Incoming signal from ${name}
          </p>
          
          <div style="background-color: #f9f9f9; padding: 32px; border-radius: 20px; margin-bottom: 32px;">
            <p style="color: #999; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Payload Content</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          
          <div style="font-size: 12px; color: #999; border-top: 1px solid #f0f0f0; padding-top: 24px;">
            <p style="margin-bottom: 4px;"><strong>Source Identity:</strong> ${name}</p>
            <p style="margin: 0;"><strong>Direct Signal:</strong> ${email}</p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="font-size: 10px; color: #ccc; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em;">CRAVE. Digital Ecosystem | Signal Intercepted</p>
          </div>
        </div>
      `,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message launched successfully', id: info.messageId });
  } catch (error: any) {
    console.error('Contact API Internal Error:', error);
    return NextResponse.json({ error: 'Sector interference. Protocol failed.' }, { status: 500 });
  }
}
