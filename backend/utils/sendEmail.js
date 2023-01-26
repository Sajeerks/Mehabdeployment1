const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    // service:process.env.SMPT_SERVICE,
    //host:"smtp.gmail.com"
    host: process.env.SMPT_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //    await transporter.sendMail(mailOptions)
  console.log(transporter.options.host);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log("Your config is correct");
  });
  ////////////////////////////
  let info = await transporter.sendMail(mailOptions);
  console.log(`Message Sent: ${info.messageId}`);
};

module.exports = sendEmail;
