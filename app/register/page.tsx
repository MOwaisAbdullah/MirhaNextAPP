"use client";

//import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {ReCAPTCHA} from 'react-google-recaptcha';
import Image from "next/image";
import { ToastAction } from "@/components/ui/toast"
import light from '@/public/images/abstract_lights_back.jpg';
import {useRef} from 'react';

import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function App() {
  const { toast } = useToast()
  const router = useRouter();
  let [Error, setError] = useState("");
  let [captchaValue, setCaptchaValue] = useState(null);
  let m = {
    name: "",
    username: "",
    password: "",
    captcha:captchaValue,
  };
  const[isButtonDisabled ,setisButtonDisabled]= useState(false)
  let [data, setInput] = useState(m);
  let [submit, setsubmit] = useState(false);
  const recaptchaRef = useRef(null);
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    //console.log(name,value)
    
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
 
 const handleCaptchaChange = (value:any) =>{
  setCaptchaValue(value);
 }
  //(e: React.FormEvent<HTMLFormElement>
  let handleSubmit = async (e: any) => {
    e.preventDefault();
       
       
    if (!data.name || !data.username || !data.password) {
      toast({
        variant: "destructive",
        title: "All Fields Are Mandatory.",
        description: "Please fill all fields.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return alert("Please fill all fields.");
     
    }

    // let text = "The best things in life are free";
    //let pattern = /e/;
    //let pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$%^&*.@]){8,}/;

    const pass_pattern = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$%^&*.@]){8,}"
    );
    let pass_result = pass_pattern.test(data.password);
    console.log(pass_result);

    //Password Validation
    if (!pass_result === true) {
      toast({
        variant: "destructive",
        title: "Weak Password!!!",
        description: "Please enter a STRONG PASSWORD.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return alert("Password must be of atleast EIGHT characters. \nIt must contains one: \n\t NUMERIC Digit. \n\t UPPER Character. \n\t LOWER Character. \n\t ALPHA NUMERIC Character.");
    }

    console.log(data);
    
    setisButtonDisabled(true)
    try {
      const response = await axios.post("api/users/register", data);
      console.log(response);
      if (response.status === 200) {
       
        alert("User Registered Sucessfully....")
        setInput(m);
        setisButtonDisabled(false)
        return router.push("/login");
        
      }
    } 
    
    catch {
      (error: any) => {
        console.log(error);
      };
    }
  }; //end of try-catch

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      
      <div className=" bg-gradient-to-bl from-mypink to-pink-800 shadow-md rounded px-16 min-w-[390px] pt-8 pb-12 mb-4">
        
        <h1 className="text-2xl text-mypeach font-sans font-bold mb-4 text-center">
          User Registration
        </h1>
        <p>{Error}</p>

        <form className="space-y-4">
          <div>
            <label className="block text-mypeach font-semibold mb-2">
              {" "}
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              autoComplete="off"
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full p-2 border border-mypeach rounded font-semibold text-mypurple   font-sans focus:outline-none  focus:border-mypurple focus:bg-mypeach"
            ></input>
          </div>

          <div>
            <label className="block text-mypeach font-semibold mb-2">
              {" "}
              User Name
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              autoComplete="off"
              onChange={handleChange}
              placeholder="Enter User Name"
              className="w-full p-2 border  border-mypeach rounded font-semibold  text-mypurple focus:outline-none font-sans focus:border-mypurple focus:bg-mypeach"
            ></input>
          </div>

          <div>
            <label className="block text-mypeach font-semibold mb-2">
              {" "}
              Password
            </label>
            <input
              type="text"
              name="password"
              value={data.password}
              autoComplete="off"
              onChange={handleChange}
              placeholder="Enter Password"
              title={"Password must be of EIGHT characters. \nIt must contains one: \n\tNUMERIC digit. \n\tUPPER Character. \n\tLOWER Character. \n\tALPHA NUMERIC Character."}
              className="w-full p-2 border border-mypeach rounded font-sans text-mypurple  font-semibold focus:outline-none focus:border-mypurple focus:bg-mypeach"
            ></input>
            
          </div>
          <div className="max-w-auto flex justify-end -translate-y-3" >
          <h2 className="font-sans font-bold text-mypeach  hover:text-mydarkbrown">
             <Link href='/login'>Already Registered? </Link>
        </h2>
          </div>
          
               
  
          
          <button
            type='submit' disabled={isButtonDisabled}
            className="bg-fuchsia-800 hover:bg-mypeach disabled:bg-gray-300 disabled:text-slate-500 text-mypeach font-bold py-2 px-4 rounded-full w-full hover:text-fuchsia-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="max-h-[auto]">
          <ReCAPTCHA
           ref={recaptchaRef}
          sitekey={'6Lf9YpMqAAAAAABjdP8xq0kgF2kC2VJejjlwAutr'}    
          onChange={handleCaptchaChange} 
          /> 
          </div>
        </form>
      </div>
    </div>
  );
}
