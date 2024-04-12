function getSignupOtpTemplate(otp: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        /* Add your custom styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #777;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .instructions {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Dear User,</p>
        <p>Your one-time password (OTP) for secure login is:</p>
        <p class="otp-code">${otp}</p>
        <div class="instructions">
            <p>Please enter this OTP on the login page to verify your identity.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`;
}

function getVerifyPasswordTemplate(otp: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
          /* Add your custom styles here */
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333;
          }
          p {
              color: #777;
          }
          .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
          }
          .instructions {
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>OTP Verification</h1>
          <p>Dear User,</p>
          <p>Your one-time password (OTP) for secure login is:</p>
          <p class="otp-code">${otp}</p>
          <div class="instructions">
              <p>Please enter this OTP on the login page to verify your identity.</p>
              <p>If you did not request this OTP, please ignore this email.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}
export { getSignupOtpTemplate, getVerifyPasswordTemplate };
