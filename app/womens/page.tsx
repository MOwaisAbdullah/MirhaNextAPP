'uae client'
import Image from "next/image";
import Link from 'next/link';

import pic2 from '@/public/images/milky.jpg';

import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";

let list: any[] = [
  {
    id: '1',
    title:'Womens Products',
    description:'Women’s unstitched suits are versatile fabric sets that include a kurta, bottom, and dupatta',
    pic:'pic1'

  },
  {
    id: '2',
    title:'Womens Dupattas',
    description:'A Dupatta is a versatile and elegant piece of clothing worn by women.',
    pic:'pic1'
    

  },

  {
    id: '3',
    title:'Womens Unstitched Suits',
     description:'Women’s unstitched suits are versatile fabric sets that include a kurta, bottom, and dupatta'
  
  }, 
  {
    id: '4',
    title:'Womens Jewellery',
     description:`Women’s jewelry encompasses a diverse range of adornments, including necklaces, earrings, occasions.`

  },
  {
    id: '5',
    title:'Womens Formal Wear',
    description:`Women’s formal wear includes sophisticated clothing designed for professional and special occasions.`,

  },
  {
    id: '6',
    title:'Womens Party Wear',
    description:'Women’s party wear encompasses a stylish range of outfits designed for special occasions and celebrations.'

  },
  {
    id: '7',
    title:'Womens Ready to Wear',
    description: 'Women’s ready-to-wear clothing offers a convenient and stylish solution for everyday fashion.'

  },
  {
    id: '8',
    title:'Womens Prod',
    description:'Women’s unstitched suits are versatile fabric sets that include a kurta, bottom, and dupatta'

  },
  {
    id: '9',
    title:'Womens Pros',
    description:'Women’s unstitched suits are versatile fabric sets that include a kurta, bottom, and dupatta'

  },
  {
    id: '10',
    title:'Wons Products',
    description:'Women’s unstitched suits are versatile fabric sets that include a kurta, bottom, and dupatta'

  },
]

export default function WomensPage () {

  return (
    <main className="min-h-screen flex flex-wrap max-w-screen justify-center items-center">
      <div className="min-h-screen flex flex-wrap justify-center items-center space-x-6 border border-stone-900 rounded-3xl ">

        {list.map((item) => <div key={item.id}>

          <CardContainer className="inter-var">
            <CardBody className="bg-mypink relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-mydarkbrown  dark:text-white"
              >
                 {item.title}
              
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-mypeach text-sm font-semibold  max-w-sm mt-2 dark:text-neutral-300"
              >
                {item.description}
              </CardItem>
              <CardItem
                translateZ="100"
                rotateX={20}
                rotateZ={-10}
                className="w-full mt-4"
              >
                <Image
                  src={pic2}
                  priority={false}
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
                <Link href={`/womens/${item.id}`}> Read More → </Link>
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






        </div>)}
      </div>
    </main>
  )
}