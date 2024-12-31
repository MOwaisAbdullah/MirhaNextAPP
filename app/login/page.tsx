"use client";
import  styles  from "@/app/login/login.module.css";
import Link from 'next/link'
import {useState}  from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import wild from '@/public/images/wildlife.jpg';
import Image from 'next/image';

export default function Loginpage() {
  const router = useRouter();

  let login_default_data = {
    username: "",
    password: "",
  };
  const[isButtonDisabled ,setisButtonDisabled]= useState(false)
  let [data, setInput] = useState(login_default_data);
  let [errorMsg, setError] = useState("");
  //handle Change function will capture input value fields data..
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    console.log(name, value);
    setInput((prev) => {return { ...prev, [name]: value }});
  };
  let [field, setfield] = useState(true);
  let [visible, setVisible] = useState(true);
  let handle_show_hide = (e: { preventDefault: any }) => {
    e.preventDefault();

    setVisible(!visible);
    setfield(!field);
  };

  let handleLogin = async (e: { preventDefault: any }) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      return alert("Please Input Login And Passoword");
    }
    console.log(data);
    setisButtonDisabled(true)
    try {
      const response = await axios.post("api/users/login", data);
      console.log(response);
      if (response.status === 200) {
        router.replace("/womens");
      }
    } catch (error: any) {
      console.log(error);
      let errors: any = error?.response?.data;
      setError(errors);
      console.log(error?.response?.data);
      setisButtonDisabled(false)
    }
  }; //end of try-catch

  return (
    <div className="min-h-screen  bg-scroll flex flex-col justify-center items-center relative ">
     
      <div className={styles.wrapper}>
      <div className= " w-[400px] h-[400px] shadow-md rounded px-16  pt-8 pb-12 mb-4 bg-gradient-to-br from-pink-700 to-mypink">
       <h1 className="text-2xl text-mb6 font-sans font-bold mb-5 text-mypeach text-center">
          Login Page
        </h1>
        <div className="font-semibold text-2xl text-lime-300 text-center">
          <h1 >
            {""}
            {`${errorMsg}`}
          </h1>
        </div>

        <form method="POST" className="space-y-4">
          <div>
            <label className="block text-mypeach font-semibold mt-4 mb-3">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter User Name"
              value={data.username}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 border border-mypeach text-mypurple font-semibold rounded focus:outline-none focus:border-mypurple focus:bg-mypeach"
            ></input>
            <span className="absolute -translate-x-9 mt-2  "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D527B7" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round"
   d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
</span>
          </div>

          <div>
            <label className="block text-mypeach font-semibold mb-2">
              {" "} 
              Password 

              </label>

            <input
              type={field ? "password" : "text"}
              name="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
              autoComplete="off"
              className=" relative w-full p-2 border border-mypeach  text-mypurple font-semibold
               rounded focus:outline-none mb-3 focus:border-mypurple focus:bg-mypeach"
            ></input>
            
            <button
              onClick={handle_show_hide}
            className="absolute w-12 h-6 mt-[9px] border border-2px rounded-md  border-mylightpink font-sans font-semibold text-purple-950 text-sm  bg-mylightpink -translate-x-[53px] hover:bg-mypink hover:text-mypeach"
            >
              {visible ? "Show" : "Hide"}
          

            </button>
            <div className="max-w-auto flex justify-end -translate-y-2 ">
              <h2 className="font-sans font-bold text-mypeach  hover:text-fuchsia-900"> <Link href='/forgetPassword'>Forgot Password ? </Link></h2> </div>
          </div>
          <button
            type="submit" disabled={isButtonDisabled}
            className="bg-mypeach hover:bg-fuchsia-700  disabled:bg-gray-400 disabled:text-slate-700 text-mypurple font-bold py-2 px-4 rounded-full w-full  hover:text-mypeach"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
