'use client'
import Link from 'next/link';
import Image from "next/image";
import pic from '@/public/images/glass.jpg';
import React from "react";
import pic1 from '@/public/images/space.jpg';
import pic2 from '@/public/images/milky.jpg';
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";

let list:any[] =[
  {id:'1',
   title:'one',
   
  },
  {
    id:'2',
    title:'two',
   
  },

  {
    id:'3',
    title:'three',
    
  },
  {
    id:'4',
    title:'four',
    
  },
  {
    id:'5',
    title:'five',
    
  },
  {
    id:'6',
    title:'six',
    
  },
  {
    id:'7',
    title:'seven',
    
  },
  {
    id:'8',
    title:'eight',
   
  },
  {
    id:'9',
    title:'nine',
   
  },
  {
    id:'10',
    title:'ten',
    
  },
]


export default function card3d() {
  return (

    <CardContainer className="inter-var">
      <CardBody className="bg-mypink relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-mydarkbrown  dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-mypeach text-sm font-semibold  max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <Image
            src={pic2}
            height="400"
            width="400"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl font-sans text-xs font-bold text-stone-900"
          >
            <Link href='/login'>Read More → </Link>
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-mypurple text-mypeach text-xs font-bold"
          >
            <Link href="/register"> Register </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}