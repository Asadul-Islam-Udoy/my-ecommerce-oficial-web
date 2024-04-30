const nodemailer = require('nodemailer')
exports.sendEmail = async(option) =>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5f5eb62938dafa",
          pass: "6eabee1aae340e"
        }
      });
const mail = {
    from:"5f5eb62938dafa",
    to:option.email,
    subject:option.subject,
    text:option.message
}
await transport.sendMail(mail)
}

