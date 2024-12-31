'use client';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";


export default function ResetPass() {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  console.log(params)
  console.log(params.token)
  
  //let tid = params.token
 // console.log(tid)

    let [Password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
    
  let [field, setfield] = useState(true);
  let [field2, setfield2] = useState(true);
  let [visible, setVisible] = useState(true);
  let [visible2, setVisible2] = useState(true);
  let handle_show_hide = (e: { preventDefault: any }) => {
    e.preventDefault();

    setVisible(!visible);
    setfield(!field);
  };
  let handle_show_hide_2 = (e: { preventDefault: any }) => {
    e.preventDefault();

    setVisible2(!visible2);
    setfield2(!field2);
  };
  const handleChange =  (e:any ) => {
    e.preventDefault();
    let { name, value } = e.target;
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

 let b = JSON.stringify({Password,params})
  const handleResetPassword = async (e: { preventDefault: any }) => {
    e.preventDefault();
    if (!Password.password || !Password.confirmPassword) {
      return alert("Please enter Password and Confirm Password to reset");
    }
    if (Password.password !== Password.confirmPassword) {
      return alert("Password and Confirm Password 'Mismatch");
    }

    const pass_pattern = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$%^&*.@]){8,}"
    );
    let pass_result = pass_pattern.test(Password.password);
    console.log('hello',pass_result);

    //Password Validation
        if (!pass_result === true) {return alert("Password must be of atleast eight chararters");} 
        if (pass_result === true) {
    try {
      const response = await axios.post("/api/users/resetpassword", b);
      console.log(response.data);
      if (response.status === 200) {
        router.replace("/login");
      }}
      catch(error:any){
        console.log(error.response.data)
        toast({
          variant: "destructive",
          title: "Password Reset Link is Expired!!!",
          description: `${error.response.data}`,
          action: <ToastAction altText="Try again"><a href="/forgetPassword">Resend Link</a></ToastAction>,
        })
        return //alert("Please fill all fields");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col  justify-center items-center">
      <div className=" bg-gradient-to-bl from-pink-900 to-pink-600  shadow-md rounded px-16 min-w-[400px] min-h-[280px] pt-8 pb-12 mb-4">
        <h1 className="text-2xl text-mypeach font-sans font-bold mb-4 text-center">
          Reset Password
        </h1>
        <form  className="space-y-2">
          <div>
            <label className="block text-mypeach font-semibold mb-2">
              Enter New Password
            </label>
            <input
              type={field ? "password" : "text"}
              autoComplete="off"
              value={Password.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter New Password"
              className="w-full p-2 border  border-mypeach rounded font-semibold  text-mypurple focus:outline-none font-sans focus:border-mypurple focus:bg-mypeach"
            ></input>
            <button
              onClick={handle_show_hide}
            className="absolute w-12 h-6 mt-[9px] border border-2px rounded-md  border-mylightpink font-sans font-semibold text-purple-950 text-sm  bg-mylightpink -translate-x-[53px] hover:bg-mypink hover:text-mypeach"
            >
              {visible ? "Show" : "Hide"}
          

            </button>
          </div>
          <div>
            <label className="block text-mypeach font-semibold mb-2">
              Confirm New Password
            </label>
            <input
              type={field2 ? "password" : "text"}
              autoComplete="off"
              value={Password.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="w-full p-2 border  border-mypeach rounded font-semibold  text-mypurple focus:outline-none font-sans focus:border-mypurple focus:bg-mypeach"
            ></input>
            <button
              onClick={handle_show_hide_2}
            className="absolute w-12 h-6 mt-[9px] border border-2px rounded-md  border-mylightpink font-sans font-semibold text-purple-950 text-sm  bg-mylightpink -translate-x-[53px] hover:bg-mypink hover:text-mypeach"
            >
              {visible2 ? "Show" : "Hide"}
          

            </button>
          </div>
          <div className="translate-y-5">
            <button
              type="submit"
              className="bg-fuchsia-800 hover:bg-mypeach text-mypeach font-bold py-2 px-4 rounded-full w-full hover:text-fuchsia-800"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
