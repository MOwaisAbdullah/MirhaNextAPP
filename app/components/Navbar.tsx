"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import Link from "next/link";
import { cn } from "../utils/cn";
import { Noto_Sans_Tamil_Supplement } from "next/font/google";



export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("relative top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
        <MenuItem setActive={setActive} active={active} item="Home" >      
         
        </MenuItem>
        </Link>
     
        <MenuItem setActive={setActive} active={active} item="Products">
        <div className="flex flex-col space-y-4 text-m">
          <HoveredLink href="/womens">Womens Clothing</HoveredLink> 
        
           
        
        </div>
         
       
             </MenuItem>
                     
                    
             <MenuItem setActive={setActive} active={active} item="Users">
             <div className="flex flex-col space-y-4 text-m">
                  <HoveredLink href="/register">Register</HoveredLink>
                  <HoveredLink href="/login">Login</HoveredLink>
                  </div>
        
        </MenuItem>  
        
        <MenuItem setActive={setActive} active={active} item="Contact Us">
        <div className="flex flex-col space-y-4 text-m">
          <HoveredLink href="/about us">About Us</HoveredLink>
          </div>
        </MenuItem>
        
          
       
      </Menu>
    </div>
  );
}
