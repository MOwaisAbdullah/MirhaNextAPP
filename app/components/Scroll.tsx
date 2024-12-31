'use client';

import Marquee from "react-fast-marquee";

import {useEffect , useState} from 'react';
import axios from 'axios';
let list2:any[] =[]

export default function Scroll() {
  const [data, setData] = useState([])
   useEffect(()=> {
     async function getdata(){
     let url = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7f909bef685b4a4a868f69d7ce476562&symbols=PKR,GBP,EUR,USD,IND,BAN,CHY,SAR,AED,JPY'
     
     try{const response = await axios.get(`${url}`)
    console.log(response.data) 
    console.log(response.data.rates)
    let curr = response.data.rates
    for(let [k , v] of Object.entries(response.data.rates)){
      console.log(k,":" ,v)
      list2.push("  ",k," : ",v," | "," ")
    }
    
    setData(curr)
    
    }
       
    catch(error){throw error }
   
    
    }  getdata()
   },[])
   
  
   return (
         
    
      <div className="  mt-2 flex justify-center rounded-md min-h-[40px] mx-2 items-center  bg-gradient-to-r from-pink-800 to-pink-700 overflow-hidden">
        
      <Marquee pauseOnHover autoFill >
  
       <ul className=" flex flex-shrink-0 justify-center mx-1 text-mypeach font-sans font-semibold">
       {list2}
       </ul>
              
       </Marquee>
       
      </div>
      
    )}
  