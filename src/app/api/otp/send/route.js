// src/app/api/otp/send/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { storeOTP, hasActiveOTP } from "@/lib/otp-store";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if there's already an active OTP
    if (hasActiveOTP(email)) {
      return NextResponse.json(
        { success: false, error: "OTP already sent. Please wait before requesting again." },
        { status: 429 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    storeOTP(email, otp);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Sahakari Seva <onboarding@resend.dev>", // Resend's default sender
      to: email,
      subject: "Your Sahakari Seva Verification OTP",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
              .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; }
              .otp-box { background: #f0f9ff; border: 2px dashed #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
              .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb; font-family: monospace; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
              .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🔐 Verification OTP</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Sahakari Seva - Cooperative Gig Platform</p>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>Use the following OTP to verify your identity on <strong>Sahakari Seva</strong>:</p>
                
                <div class="otp-box">
                  <div class="otp-code">${otp}</div>
                </div>
                
                <p style="color: #6b7280; font-size: 14px;">
                  This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
                </p>
                
                <div class="warning">
                  ⚠️ If you didn't request this OTP, please ignore this email. Someone might have entered your email by mistake.
                </div>
                
                <p>Thank you for joining our cooperative platform!</p>
                <p style="color: #6b7280; font-size: 14px;">— Team Sahakari Seva</p>
              </div>
              <div class="footer">
                <p>This is an automated message from Sahakari Seva (SIH 2026)</p>
                <p>© 2026 Cooperative Gig Platform • Problem Statement 26089</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully",
      // In production, NEVER return the OTP. This is just for demo purposes.
      demo_otp: otp 
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}