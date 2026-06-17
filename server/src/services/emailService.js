const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  auth: {
    user: process.env.EMAIL_USER || 'mock-user',
    pass: process.env.EMAIL_PASS || 'mock-pass',
  },
});

exports.sendWelcomeEmail = async (user, password) => {
  const mailOptions = {
    from: `"Axon Academy" <${process.env.EMAIL_FROM || 'noreply@Axon.com'}>`,
    to: user.email,
    subject: 'Welcome to Axon Academy!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #1A0F33; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Welcome to AxonAcademy</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${user.fullName},</p>
          <p>Congratulations! You have been successfully registered as a student at <strong>Hospital Training Academy</strong>.</p>
          <p>You can now access your learning portal using the credentials below:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Portal URL:</strong> <a href="${process.env.CLIENT_URL || 'https://axon-portal.com'}">${process.env.CLIENT_URL || 'https://axon-portal.com'}</a></p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
          </div>
          <p>On the portal, you can:</p>
          <ul>
            <li>Access your live classrooms and meetings.</li>
            <li>Watch recorded sessions and view chapters.</li>
            <li>Take quizzes and track your progress.</li>
            <li>Communicate with faculty and admins.</li>
          </ul>
          <p>Please change your password after your first login for security reasons.</p>
          <p>If you have any questions, feel free to contact us at support@axonacademy.com.</p>
          <p>Best Regards,<br><strong>AxonAcademy Admin Team</strong></p>
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} AxonAcademy. All rights reserved.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent: %s', info.messageId);
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
