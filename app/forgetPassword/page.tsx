"use client";
import  {useState}  from "react";
import axios from "axios";
import pic7 from '@/public/images/freepik__retouch.jpg'
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import pic from "@/public/images/abstract_lights_back.jpg"
import { NextResponse } from "next/server";
import { ToastAction } from "@/components/ui/toast"

export default function ForgetPassword() {
  const router = useRouter();
  const { toast } = useToast()
  let [Email, setEmail] = useState('')
  const[isButtonDisabled ,setisButtonDisabled]= useState(false);

  console.log(Email)
  let data = JSON.stringify(Email)
  const handleSendEmail = async (e: any) => 
  {
    e.preventDefault();
    if (!Email) {
      toast({
        variant: "destructive",
        title: "Email Address Required!!!.",
        description: "Please enter email address.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
       return }
       setisButtonDisabled(true)
    try {
      let response = await axios.post('api/users/forgetPassword', data);
      
    
    
      if (response.status === 200) {
        console.log(response.data)
        alert( "Password Reset Link sent successfully. Please check Email.")
        toast({
          variant: "default",
          title: "Please check your email",
          description: "Password Reset Link Sent Successfully.",
          action: <ToastAction altText="Try again">OK !</ToastAction>,
        })
        setEmail('')
        setisButtonDisabled(true)
        router.push('/register')
      }
      }
    catch (error: any){
      console.log(error);
      console.log(error?.response?.data);
      toast({
        variant: "destructive",
        title: "User Not Registered !",
        description: "Please enter correct email address to reset password!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setisButtonDisabled(false);
      alert(error?.response?.data)
      
    } 
    
    
    
  };
//bg-gradient-to-tr from-pink-700 to-mypink 
  return (
    <div className="min-h-screen flex justify-center items-center">
    <div className='flex items-center justify-center  ' style={{ width: '600px', height: '450px', position: 'relative' }}>
    <Image
          src={pic7} // Image path from the public folder
          alt="Sample Image"
          style={{
            width: '100%', 
            height: '90%',
            objectFit: 'cover',  // Ensures the image covers the div gradient-to-tr from-pink-700 to-mypink 
            
          }}
        />
      <div className="  absolute  bg-gradient-to-tr from-pink-700 to-mypink shadow-md rounded px-16 min-w-[400px] min-h-[280px] pt-8 pb-12 mb-4">
        <h1 className="text-2xl text-mypeach font-sans font-bold mb-4 text-center">
          Reset Password
        </h1>

        <form method="post" className="space-y-2">
          <div>
            <label className="block text-mypeach font-semibold mb-2">
              Enter email address to reset password
            </label>
            <input
              type="email"
              autoComplete="off"
              value={Email}
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="w-full p-2 border  border-mypeach rounded font-semibold  text-mypurple focus:outline-none font-sans focus:border-mypurple focus:bg-mypeach"
            ></input>
          </div>
          <div className="translate-y-5">
            <button
              type="submit" disabled={isButtonDisabled}
              className="bg-fuchsia-800 hover:bg-mypeach disabled:bg-gray-300 disabled:text-slate-500 text-mypeach font-bold py-2 px-4 rounded-full w-full hover:text-fuchsia-800"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
