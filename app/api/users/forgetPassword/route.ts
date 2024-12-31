"use server";
import { MongoClient } from "mongodb";
import transporter from "@/components/nodemailer";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => 
{
  const pwdResetKey: any = new TextEncoder().encode(process.env.JWT_SECRET_PWDRESET);
  const url =  "mongodb+srv://owaisabdullah:jNdqBbZzvdylpKiA@uroosamongodb.icxudte.mongodb.net/";
  const client = new MongoClient(url);
  try {
    const body = await request.json();
    const username = body;
    await client.connect();
    console.log("Connected successfully to MongoDB server");
   // console.log(body)
    //console.log(username);
    const database = client.db("uroosa");
    const registeredUser = database.collection("mirha");
    const user_found = await registeredUser.findOne({ username: `${username }`});
    console.log(user_found);
    
    if (user_found == undefined) {return new Response("User Not Registered !", { status: 400 })}
    
   if(user_found?.username === username) 
    {
      const nano_token = nanoid(); //=> "IRFa-VaY2b"
      console.log(nano_token);
      //start of db token insert try catch*********************************
      try {
        const id = user_found?._id;
        let date = Date();
        console.log(id);
        await registeredUser.updateOne({ _id: id }, [
          { $set: { PWD_reset_token: nano_token } },
          { $set: { PWD_reset_date: date } },
        ]);
      } catch (error) {
        console.log(error);
       
      }
      
      
      //END  of db token insert try catch*****************************************
      //start of JWT COOKIE FOR PASSWORD REQUEST
       const usernamedb = user_found?.username;
       const id = user_found?._id;
      const pwdtokenData = { db_user_id:id,
                            username: usernamedb,
                              token:nano_token,
       };

      const pwdToken: any = jwt.sign({ data: pwdtokenData },  pwdResetKey, {
        expiresIn: 3600,
      });

      (await cookies()).set({
        name: "PWDJWTReSet",
        value: pwdToken,
        httpOnly: true,
        maxAge: 3600,
        secure: true,
      });

      //END OF JWT ****************************************************************888
      //send email try catch
      try {
        // send mail with defined transport object
        const emailSend = await transporter.sendMail({
          from: process.env.USER, // sender address
          to: `${username}`, // list of receivers
          subject: "Password Reset Request for Mirha Collection", // Subject line
          text: "Password Reset Request for Mirha Collection in plain text body", // plain text body
          html: `<h2>Dear User!</h2>
           <h3><p>Please click on below mentioned Password Reset link to reset your password.</p></h3>
          <br><link> http://localhost:3000/resetPassword/${nano_token}</link></br>
          <br><p>Regards,<h3>Mirha Collection</h3></p></br>`, // htmlbody
        });

        console.log("Message Sent:", emailSend.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        
        return  NextResponse.json("Password Reset Link sent successfully. Please check Email.",
          { status: 200 }
        );} catch (error) {
        console.log(error);
      }  return new Response("Error sending email.", { status: 500 });
      
    }
   return new Response('OK')
  } catch (error) {
    console.log(error);
    return new Response("Error sending email.", { status: 500 });
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  
};



