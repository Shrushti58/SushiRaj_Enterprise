const nodemailer = require('nodemailer');
const { getAdminEmailTemplate, getCustomerEmailTemplate } = require('../utils/emailTemplate');

const submitContactForm = async (req, res) => {
  const { name, phone, message, email } = req.body;

  console.log("USER:", process.env.EMAIL_USER);
  console.log("PASS:", process.env.EMAIL_PASS);

  // ✅ Create transporter HERE (not global)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Validation
  if (!name || !phone || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Please fill all required fields' 
    });
  }

  try {
    // ✅ Verify connection (IMPORTANT DEBUG STEP)
    await transporter.verify();
    console.log("SMTP connection verified");

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'shrushtipatil1514@gmail.com',
      subject: `New Enquiry from ${name}`,
      html: getAdminEmailTemplate(name, phone, message)
    });

    // Auto reply
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Sushiraj Enterprise',
        html: getCustomerEmailTemplate(name)
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email error FULL:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
};

module.exports = { submitContactForm };