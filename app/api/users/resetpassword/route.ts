"use server";
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export const POST = async (NextRequest: { json: () => any }) => {
  const url: any =
    "mongodb+srv://owaisabdullah:jNdqBbZzvdylpKiA@uroosamongodb.icxudte.mongodb.net/";
  const client = new MongoClient(url);
  try {
    const body = await NextRequest.json();
    const data = body;
    //console.log(data);
    console.log(data.Password.password);
    console.log(data.params.token);
    let token = data.params.token;
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const database = client.db("uroosa");
    const registeredUser = database.collection("mirha");
    const user_found: any | null = await registeredUser.findOne({PWD_reset_token: `${token}`});
    console.log(user_found);
    if (user_found == null) {
      return new Response("Invalid Token", { status: 404 });
    }
    const username = user_found.username;
    const PWD_reset_date = user_found.PWD_reset_date;
    const PWD_reset_token = user_found.PWD_reset_token;
    const hash_password = await bcrypt.hash(`${data.Password.password}`, 15);
    await registeredUser.updateOne(
      { username: `${username}` },
      { $set: { hashpassword: hash_password , PWD_reset_token: "" } }
    );

    return new Response("Password updation successfull.", { status: 200 });
  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
