import Image from "next/image";
import Scroll from "@/app/components/Scroll";
import axios from "axios";
import wild from '@/public/images/wildlife.jpg';
import light from '@/public/images/abstract_lights_back.jpg';

export default function Home() {


  return (
    <main className="flex min-h-[500px] flex-col ">
    
    <div className=" bg-pink-600 mt-[50px] items-center justify-center" >
      <h1 className=" flex justify-center items-center text-mypeach"> LIVE CURRENCY RATES ARE SHOWING BELOW</h1>
      </div>
      <Scroll/>
      <div className='flex' style={{ width: '100%', height: '700px', position: 'relative' }}>
      
       <Image
      src={wild}
      alt="fine"
      priority={true}
      style={{
        width: '100%', 
        height: '100%',
        objectFit: 'cover',  // Ensures the image covers the div
      }}
      
    />
     <h1 className="absolute mt-2 mx-3 text-mypeach font-bold  text-5xl"> Welcome !</h1>
    <h1 className="absolute mt-[60px] mx-[450px] text-emerald-900 font-bold  text-5xl"> This is the Home Page</h1>
    </div>
    </main>
  );
}
