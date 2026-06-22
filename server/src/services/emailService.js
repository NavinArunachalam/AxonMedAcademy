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

exports.sendMeetingScheduledEmail = async (student, meeting, classroomName) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:8080';
  const joinUrl = `${clientUrl}/live/${meeting.roomId}`;
  const formattedTime = new Date(meeting.scheduledAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const mailOptions = {
    from: `"Axon Med Academy" <${process.env.EMAIL_FROM || 'noreply@axonmedacademy.com'}>`,
    to: student.email,
    subject: `Live Class Scheduled: ${meeting.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #1A0F33; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Live Class Scheduled</h1>
          <p style="margin: 5px 0 0 0; color: #dcd6f7; font-size: 14px;">${classroomName}</p>
        </div>
        <div style="padding: 25px;">
          <p>Dear ${student.fullName || 'Student'},</p>
          <p>A new live class has been scheduled for your classroom <strong>${classroomName}</strong>.</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #4C1D95; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; width: 120px; vertical-align: top;">Topic:</td>
                <td style="padding: 5px 0; color: #1A0F33; font-weight: bold;">${meeting.title}</td>
              </tr>
              ${meeting.description ? `
              <tr>
                <td style="padding: 5px 0; font-weight: bold; vertical-align: top;">Description:</td>
                <td style="padding: 5px 0;">${meeting.description}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 5px 0; font-weight: bold; vertical-align: top;">Time:</td>
                <td style="padding: 5px 0; color: #4C1D95; font-weight: bold;">${formattedTime} (IST)</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; vertical-align: top;">Duration:</td>
                <td style="padding: 5px 0;">${meeting.duration} minutes</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${joinUrl}" style="background-color: #84CC16; color: #1A0F33; text-decoration: none; padding: 12px 30px; font-weight: bold; border-radius: 25px; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              ▶ Join Live Class
            </a>
          </div>
          
          <p style="font-size: 13px; color: #666; text-align: center;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${joinUrl}" style="color: #4C1D95;">${joinUrl}</a>
          </p>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee;">
          &copy; ${new Date().getFullYear()} Axon Academy. All rights reserved.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Meeting schedule notification sent to ${student.email}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`[Email] Failed to send meeting schedule to ${student.email}:`, error);
    return false;
  }
};
