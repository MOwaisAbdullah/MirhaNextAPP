"use server";
import { MongoClient, ReturnDocument } from "mongodb";
import { NextResponse , NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export const POST = async (request:NextRequest) => {
  let key: any = new TextEncoder().encode(process.env.JWT_SECRET);
  const url =
    "mongodb+srv://owaisabdullah:jNdqBbZzvdylpKiA@uroosamongodb.icxudte.mongodb.net/";
  const client = new MongoClient(url);
  try {
    const body = await request.json();
    const { username, password} = body;
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const database = client.db("uroosa");
    const registeredUser = database.collection("mirha");
    const user_found = await registeredUser.findOne({
      username: `${username}`,
    }); //.limit(10).toArray()
   // console.log(user_found?.username);
   // console.log(user_found?.hashpassword);
   // console.log('i m body',`${password}`)
    //console.log('i m body username',`${username}`)
    //console.log(body)
    try 
    {
      let dbusername = user_found?.username;
      let dbhashpass = user_found?.hashpassword;
      console.log(user_found)
      if (user_found == undefined) {return new Response("User Not Registered !", { status: 400 })}
      
      if(user_found !== undefined)
      
        {const result = await bcrypt.compare(`${password}`,dbhashpass)
      
      console.log(result) 
       
      if(result === true)
      {
        const tokenData = { username: dbusername };
        const token: any = jwt.sign({ data: tokenData }, key, { expiresIn: 300, });
          
        (await cookies()).set({
            name: "JWT",
            value: token,
            httpOnly: true,
            maxAge: 360,
            secure: true,
          });
       return new NextResponse("login successfull", { status: 200 })
      }
      else{return new NextResponse("Invalid Password", { status: 400 })} 
         
    } 
    
    }
    
    catch (error) { console.log(error); }

  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
