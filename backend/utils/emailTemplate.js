const getAdminEmailTemplate = (name, phone, message) => {
  const whatsappPhone = phone.replace(/\D/g, '');
  const callPhone = phone.replace(/\s/g, '');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enquiry - Sushiraj Enterprise</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #060e1a;
      padding: 32px 16px;
      min-height: 100vh;
    }
    .wrapper { max-width: 580px; margin: 0 auto; }
    .container {
      background: #0a1628;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(26, 188, 156, 0.15);
    }
    .header {
      background: #0F2B4D;
      padding: 36px 32px;
      text-align: center;
      border-bottom: 3px solid #1ABC9C;
    }
    .header-wordmark {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .wordmark-bar {
      width: 3px;
      height: 34px;
      background: #1ABC9C;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 2px;
      text-align: left;
      line-height: 1.2;
    }
    .header h1 span {
      display: block;
      color: #1ABC9C;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 3px;
      margin-top: 3px;
    }
    .header-tag {
      display: inline-block;
      background: rgba(26, 188, 156, 0.12);
      border: 1px solid rgba(26, 188, 156, 0.25);
      color: #1ABC9C;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2px;
      padding: 4px 14px;
      border-radius: 50px;
    }
    .content { padding: 32px; }
    .section-title {
      font-size: 10px;
      font-weight: 600;
      color: rgba(255,255,255,0.3);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .field {
      display: flex;
      align-items: flex-start;
      padding: 13px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .field:last-child { border-bottom: none; }
    .field-label {
      width: 110px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.3);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding-top: 1px;
    }
    .field-value {
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      flex: 1;
      word-break: break-word;
    }
    .field-value a { color: #1ABC9C; text-decoration: none; }
    .message-wrap { margin: 28px 0; }
    .message-box {
      background: rgba(26, 188, 156, 0.05);
      border: 1px solid rgba(26, 188, 156, 0.14);
      border-left: 3px solid #1ABC9C;
      border-radius: 0 10px 10px 0;
      padding: 18px 20px;
    }
    .message-box p {
      font-size: 14px;
      color: rgba(255,255,255,0.7);
      line-height: 1.75;
    }
    .actions {
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .btn-row { display: flex; gap: 10px; margin-top: 14px; }
    .btn {
      flex: 1;
      display: block;
      text-align: center;
      padding: 13px 16px;
      border-radius: 10px;
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.3px;
    }
    .btn-primary { background: #1ABC9C; color: #ffffff; }
    .btn-secondary {
      background: transparent;
      color: #25D366;
      border: 1px solid rgba(37, 211, 102, 0.3);
    }
    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 22px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      color: rgba(255,255,255,0.3);
    }
    .meta-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #1ABC9C;
      flex-shrink: 0;
    }
    .footer {
      background: #060e1a;
      padding: 18px 32px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .footer p {
      font-size: 11px;
      color: rgba(255,255,255,0.2);
      text-align: center;
      line-height: 1.9;
    }
    @media (max-width: 480px) {
      .content { padding: 24px 20px; }
      .footer { padding: 16px 20px; }
      .btn-row { flex-direction: column; }
      .field-label { width: 90px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <div class="header-wordmark">
          <div class="wordmark-bar"></div>
          <h1>SUSHIRAJ ENTERPRISE<span>WATER PURIFICATION SOLUTIONS</span></h1>
        </div>
        <div class="header-tag">NEW ENQUIRY</div>
      </div>

      <div class="content">
        <div class="section-title">Customer Details</div>

        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${name}</div>
        </div>
        <div class="field">
          <div class="field-label">Phone</div>
          <div class="field-value"><a href="tel:${callPhone}">${phone}</a></div>
        </div>
        <div class="field">
          <div class="field-label">Received</div>
          <div class="field-value">${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
        </div>

        <div class="message-wrap">
          <div class="section-title">Message</div>
          <div class="message-box"><p>${message}</p></div>
        </div>

        <div class="actions">
          <div class="section-title">Quick Actions</div>
          <div class="btn-row">
            <a href="tel:${callPhone}" class="btn btn-primary">Call Customer</a>
            <a href="https://wa.me/${whatsappPhone}?text=Hello%20${encodeURIComponent(name)}%2C%20this%20is%20Sushiraj%20Enterprise.%20We%20received%20your%20enquiry%20and%20would%20like%20to%20assist%20you." class="btn btn-secondary">WhatsApp</a>
          </div>
        </div>

        <div class="meta-row">
          <div class="meta-item"><div class="meta-dot"></div>Respond within 24 hours</div>
          <div class="meta-item"><div class="meta-dot"></div>Sangli, Maharashtra</div>
          <div class="meta-item"><div class="meta-dot"></div>Since 2020</div>
        </div>
      </div>

      <div class="footer">
        <p>Sushiraj Enterprise &nbsp;&middot;&nbsp; Sangli, Maharashtra<br>
        Automated notification from your website contact form.</p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
};


const getCustomerEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Sushiraj Enterprise</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #060e1a;
      padding: 32px 16px;
      min-height: 100vh;
    }
    .wrapper { max-width: 560px; margin: 0 auto; }
    .container {
      background: #0a1628;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(26, 188, 156, 0.15);
    }
    .header {
      background: #0F2B4D;
      padding: 36px 32px;
      text-align: center;
      border-bottom: 3px solid #1ABC9C;
    }
    .header-wordmark {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .wordmark-bar {
      width: 3px;
      height: 34px;
      background: #1ABC9C;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 2px;
      text-align: left;
      line-height: 1.2;
    }
    .header h1 span {
      display: block;
      color: #1ABC9C;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 3px;
      margin-top: 3px;
    }
    .hero {
      padding: 44px 32px 36px;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .check-ring {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px solid #1ABC9C;
      background: rgba(26, 188, 156, 0.08);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 22px;
    }
    .hero h2 {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.3px;
      margin-bottom: 10px;
    }
    .hero h2 span { color: #1ABC9C; }
    .hero p {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      line-height: 1.75;
      max-width: 400px;
      margin: 0 auto;
    }
    .status-wrap { padding: 0 32px; margin-top: 28px; }
    .status-strip {
      padding: 14px 20px;
      background: rgba(26, 188, 156, 0.06);
      border: 1px solid rgba(26, 188, 156, 0.18);
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1ABC9C;
      flex-shrink: 0;
    }
    .status-strip p {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.65);
    }
    .contact-section { padding: 32px; }
    .section-title {
      font-size: 10px;
      font-weight: 600;
      color: rgba(255,255,255,0.3);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .contact-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      overflow: hidden;
    }
    .contact-row {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .contact-row:last-child { border-bottom: none; }
    .contact-label {
      width: 72px;
      flex-shrink: 0;
      font-size: 10px;
      font-weight: 600;
      color: rgba(255,255,255,0.28);
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .contact-value {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      flex: 1;
    }
    .contact-value a {
      color: #1ABC9C;
      text-decoration: none;
      font-weight: 500;
    }
    .cta-row {
      display: flex;
      gap: 10px;
      margin-top: 18px;
    }
    .btn {
      flex: 1;
      display: block;
      text-align: center;
      padding: 13px 16px;
      border-radius: 10px;
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.3px;
    }
    .btn-primary { background: #1ABC9C; color: #ffffff; }
    .btn-secondary {
      background: transparent;
      color: #25D366;
      border: 1px solid rgba(37, 211, 102, 0.3);
    }
    .trust-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 24px;
      padding-top: 22px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .trust-item {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      color: rgba(255,255,255,0.3);
    }
    .trust-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #1ABC9C;
      flex-shrink: 0;
    }
    .footer {
      background: #060e1a;
      padding: 18px 32px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .footer p {
      font-size: 11px;
      color: rgba(255,255,255,0.2);
      text-align: center;
      line-height: 1.9;
    }
    @media (max-width: 480px) {
      .hero { padding: 32px 20px 28px; }
      .contact-section { padding: 24px 20px; }
      .status-wrap { padding: 0 20px; }
      .footer { padding: 16px 20px; }
      .cta-row { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <div class="header-wordmark">
          <div class="wordmark-bar"></div>
          <h1>SUSHIRAJ ENTERPRISE<span>WATER PURIFICATION SOLUTIONS</span></h1>
        </div>
      </div>

      <div class="hero">
        <div class="check-ring">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#1ABC9C" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2>Thank you, <span>${name}</span></h2>
        <p>We have received your enquiry and our team will get back to you shortly. We look forward to assisting you.</p>
      </div>

      <div class="status-wrap">
        <div class="status-strip">
          <div class="status-indicator"></div>
          <p>Enquiry received. Expected response within 24 hours.</p>
        </div>
      </div>

      <div class="contact-section">
        <div class="section-title">Immediate Assistance</div>

        <div class="contact-card">
          <div class="contact-row">
            <div class="contact-label">Phone</div>
            <div class="contact-value">
              <a href="tel:918888800773">+91 88888 00773</a>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              <a href="tel:919763473858">+91 97634 73858</a>
            </div>
          </div>
          <div class="contact-row">
            <div class="contact-label">Email</div>
            <div class="contact-value">
              <a href="mailto:Sushiraj.enterprises@gmail.com">Sushiraj.enterprises@gmail.com</a>
            </div>
          </div>
          <div class="contact-row">
            <div class="contact-label">Location</div>
            <div class="contact-value" style="color: rgba(255,255,255,0.5); font-weight: 400; font-size: 13px;">Sangli, Maharashtra, India</div>
          </div>
        </div>

        <div class="cta-row">
          <a href="tel:918888800773" class="btn btn-primary">Call Now</a>
          <a href="https://wa.me/918888800773?text=Hello%2C%20I%20need%20assistance%20with%20water%20purification." class="btn btn-secondary">WhatsApp</a>
        </div>

        <div class="trust-row">
          <div class="trust-item"><div class="trust-dot"></div>5000+ happy families</div>
          <div class="trust-item"><div class="trust-dot"></div>ISO certified</div>
          <div class="trust-item"><div class="trust-dot"></div>24/7 support</div>
          <div class="trust-item"><div class="trust-dot"></div>Since 2020</div>
        </div>
      </div>

      <div class="footer">
        <p>Sushiraj Enterprise &nbsp;&middot;&nbsp; Sangli, Maharashtra<br>
        &copy; ${new Date().getFullYear()} Sushiraj Enterprise. All rights reserved.</p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
};

module.exports = { getAdminEmailTemplate, getCustomerEmailTemplate };