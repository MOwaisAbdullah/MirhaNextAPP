"use server";
import { MongoClient } from "mongodb";
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (request:NextRequest): Promise<Response>=> {
  const url ="mongodb+srv://owaisabdullah:jNdqBbZzvdylpKiA@uroosamongodb.icxudte.mongodb.net/";
  const client = new MongoClient(url);
  try {
    const body = await request.json();
    const { name, username, password } = body;
    let date = Date();
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const database = client.db("uroosa");
    const registeredUser = database.collection("mirha");

    const user_found = await registeredUser.findOne({
      username: `${username}`,
    }); //.limit(10).toArray()
    console.log(user_found);
    let exist_user = user_found?.username;
    console.log(exist_user);
    console.log(body)
    console.log(password)
    //===================password hashing here===================

    //===================================

    if (exist_user !== username) {
      const hashpassword = await bcrypt.hash(`${password}`, 15);
      const new_user = await registeredUser.insertOne({
        name,
        username,
        hashpassword,
        date,
      });
      console.log(hashpassword)
      return new Response("User registered Sucessfully", { status: 200 });
    } else
      return new Response(
        "User with this email already registered. Please try different email address.",
        { status: 401 }
      );
  } catch (error) {
    return new Response("An error occurred while processing your request.", { status: 500 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
