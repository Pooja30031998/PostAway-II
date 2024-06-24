import mail from "nodemailer";

export const sendMail = async (userEmail, otp) => {
  const transporter = mail.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: "poojapravin1998@gmail.com",
      pass: "jjlo luvl btdb ylkp",
    },
  });
  const mailOptions = {
    from: "poojapravin1998@gmail.com",
    to: userEmail,
    subject: "Security Code for Changing Your Password",
    text: `Dear User,

    Your request to change the password has been received. 
    To proceed, please use the following otp Code:

    otp Code: ${otp}

    This otp code is valid for 10 munites and can only be used once. 
    If you did not initiate this request, please disregard this email.

    Regards,
    [Coders] Team`,
  };
  try {
    const response = await transporter.sendMail(mailOptions);
    return "Email Sent Successfully";
  } catch (err) {
    console.log(err);
  }
};
