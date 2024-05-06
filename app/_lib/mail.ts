import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "send.one.com", // Your SMTP server host
  port: 465, // Standard port for SSL
  secure: true, // True for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL, // Your SMTP username from environment variables
    pass: process.env.SMTP_PASSWORD, // Your SMTP password from environment variables
  },
});

// Function to send generic emails
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: `"Sendigo" <noreply@sendigo.se>`,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("E-post skickat till:", to);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Could not send email:", error.message);
      throw new Error("Failed to send email: " + error.message);
    } else {
      console.error("Unexpected error type:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function sendVerificationEmail(
  to: string,
  verificationToken: string
) {
  const domain = "http://localhost:3000";

  const verificationLink = `${domain}/api/verify-email/${verificationToken}`;

  const html = `
    <p>To verify your email address, please click on the link below:</p>
    <a href="${verificationLink}">Verify Email Address</a>
  `;

  await sendEmail(to, "Verify Your Email Address", html);
}
