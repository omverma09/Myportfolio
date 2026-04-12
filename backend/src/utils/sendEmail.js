const nodemailer = require("nodemailer");
const { config } = require("../config/env");

const createTransporter = () => {
    return nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.SMTP_PORT === 465,
        auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASS,
        },
    });
};

/**
 * @param {object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.html
 * @param {string} options.text   - plain text fallback
 */
const sendEmail = async (options) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"${config.EMAIL_FROM_NAME}" <${config.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || "",
    };

    const info = await transporter.sendMail(mailOptions);

    if (config.isDev) {
        console.log(`📧  Email sent: ${info.messageId}`);
    }

    return info;
};

// Contact form notification email
// Sent to admin when someone fills the contact form
const sendContactNotification = async ({ name, email, subject, message }) => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body        { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container  { max-width: 600px; margin: 2rem auto; background: #fff; border-radius: 8px; overflow: hidden; }
          .header     { background: linear-gradient(135deg, #0ea5e9, #64ffda); padding: 2rem; text-align: center; }
          .header h1  { color: #020617; margin: 0; font-size: 1.4rem; }
          .body       { padding: 2rem; }
          .field      { margin-bottom: 1.25rem; }
          .label      { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem; }
          .value      { color: #1e293b; font-size: 0.95rem; line-height: 1.6; }
          .message    { background: #f8fafc; border-left: 3px solid #0ea5e9; padding: 1rem 1.25rem; border-radius: 0 6px 6px 0; }
          .footer     { padding: 1.5rem 2rem; background: #f8fafc; text-align: center; color: #94a3b8; font-size: 0.8rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Contact Message</h1>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message">${message.replace(/\n/g, "<br/>")}</div>
            </div>
          </div>
          <div class="footer">
            Received from your portfolio contact form
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: config.EMAIL_FROM,
        subject: `Portfolio Contact: ${subject}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });
};

// Auto-reply to sender
const sendContactAutoReply = async ({ name, email }) => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body        { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container  { max-width: 600px; margin: 2rem auto; background: #fff; border-radius: 8px; overflow: hidden; }
          .header     { background: linear-gradient(135deg, #0ea5e9, #64ffda); padding: 2rem; text-align: center; }
          .header h1  { color: #020617; margin: 0; font-size: 1.4rem; }
          .body       { padding: 2rem; color: #334155; line-height: 1.8; }
          .footer     { padding: 1.5rem 2rem; background: #f8fafc; text-align: center; color: #94a3b8; font-size: 0.8rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thanks for reaching out! 👋</h1>
          </div>
          <div class="body">
            <p>Hi <strong>${name}</strong>,</p>
            <p>
              Thank you for your message! I've received it and will get
              back to you as soon as possible — usually within 24 hours.
            </p>
            <p>
              In the meantime, feel free to check out my projects on
              GitHub or connect with me on LinkedIn.
            </p>
            <p>
              Best regards,<br/>
              <strong>${config.EMAIL_FROM_NAME}</strong>
            </p>
          </div>
          <div class="footer">
            This is an automated reply — please do not respond to this email.
          </div>
        </div>
      </body>
    </html>
  `;

    return sendEmail({
        to: email,
        subject: "Thanks for your message!",
        html,
        text: `Hi ${name},\n\nThank you for your message! I'll get back to you within 24 hours.\n\nBest regards,\n${config.EMAIL_FROM_NAME}`,
    });
};

module.exports = {
    sendEmail,
    sendContactNotification,
    sendContactAutoReply,
};