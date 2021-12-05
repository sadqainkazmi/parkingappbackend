

const nodemailer = require("nodemailer");
function email(to,subject,message){
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
 
    // let testAccount =  nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'pablo.johnston60@ethereal.email', // generated ethereal user
            pass: 'yfjr6FJnndxh97uFtg', // generated ethereal password
        },
    });

    
    let info =  transporter.sendMail({
        from: 'pablo.johnston60@ethereal.email', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        //   html: "<b>Hello world?</b>", // html body
    }).then((data)=>{console.log('Mail sent', data)})
    .catch(err => {console.error('Failure',err)});
  
    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // return res.status(200).send({ status: 1, message: "email send successfull", data: info });
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = {  email }