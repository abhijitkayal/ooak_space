import nodemailer from "nodemailer";

export const sendEmailOTP = async (email: string, otp: string) => {
  try {
    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // email template
    const mailOptions = {
      from: `"Workspace Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - OTP Code",
      html: `
        <div style="font-family:Arial; padding:20px;">
          <h2>Email Verification</h2>
          <p>Your verification code is:</p>

          <div style="
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
            color:#4f46e5;
            margin:20px 0;
          ">
            ${otp}
          </div>

          <p>This code expires in 10 minutes.</p>

          <p style="color:#888; font-size:12px;">
            If you didn’t request this, ignore this email.
          </p>
        </div>
      `,
    };

    // send email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false };
  }
};