import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
import * as cors from 'cors';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arunpallikandath@gmail.com',
    pass: 'xxxxxxxxx'
  }
});

admin.initializeApp();
const corsHandler = cors({origin: true})

exports.sendContactNotification = functions.https.onRequest((req, res) => {

  corsHandler(req, res, () => {
     const email = req.body.email;

    // const dest = 'arunpallikandath@gmail.com';

    const mailOptions = {
      from: 'noreply <arunpallikandath@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: email,
      subject: 'New contact enquiry recieved', // email subject
      html: `<p style="font-size: 16px;">New contact enquiry received</p>
             <p>From: ${req.body.fullName} </p>
             <p>Email: ${req.body.email} </p>
             <p>Organisation: ${req.body.organization} </p>
             <p>Phone: ${req.body.phone} </p>
            `
    };
    // returning result

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if(error){
        return res.send({"message": error.toString()});
      }
      return res.send({"message": 'Email Sent!'});
    });
  });


});

