

export default function Footer() {
  return (
    
    <div className="inset-x-0 bottom-0 grid min-h-[500px] bg-stone-800">


      <div className=" flex max-h-[150px] text-2xl font-semibold font-sans justify-center text-mypeach mt-4" >MIRHA OWAIS | FAIZ ABDULLAH </div>
      
      <div className="text-neutral-400 grid grid-cols-4">
        <div className= "border-r-mypink border-r-2 flex  justify-center">
           <ul className="text-center text-stone-300">
          <li className="text-mypeach text-2xl mb-6 mt-3 font-extrabold">Menu</li>
            <li>About Us</li>
            <li>Faculty</li>
            <li>Student Works</li>
            <li>Support Us</li>
            <li>Arts Scholarship</li>
            <li>Request Form</li>
            <li>Student Policy</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex justify-center border-r-mypink border-r-2">
          <ul className="text-center text-stone-300">
          <li className="text-mypeach text-2xl mt-3 mb-6 font-extrabold">Courses</li>
            <li>Islamic Manuscript</li>
            <li> Illumination</li>
            <li>Islamic Geometric Patterns</li>
            <li>Islamic Aesthetics and Design</li>
          </ul>
        </div>
        <div className="flex  justify-center border-r-mypink border-r-2">
          <ul className="text-center text-stone-300">
          <li className="text-mypeach text-2xl mt-3 mb-6 font-extrabold ">Contact</li>
            <li>owaisgold12@gmail.com</li>
            <li>+92 0339-123455104</li>
          </ul>
        </div>
        <div className="flex  justify-center">
          <ul className="text-center text-stone-300">
          <li className="text-mypeach text-2xl mt-3 mb-6 font-extrabold">Socials</li>
            <li>Facebook</li>
            <li>Youtube</li>
            <li>Instagram</li>
          </ul>
        </div>


      </div>
      <div className="flex text-sm items-center justify-center max-h-[150px] text-mypeach">
                   MIRHA - NextJS | Copyright © 2024. | All Rights Reserved. | Contact Us
      
      </div>
     
    </div>
    
  );
}
