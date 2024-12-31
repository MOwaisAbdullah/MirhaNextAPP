'use client'
import pic7 from '@/public/images/freepik__retouch.jpg'
import Image from 'next/image';
export default function Womenspage () {

    return (
      <main className="min-h-screen flex flex-wrap max-w-screen justify-center items-center">

<div>
      <h1>Image Example in Next.js</h1>
      <div className='flex items-center justify-center' style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Image
          src={pic7} // Image path from the public folder
          alt="Sample Image"
          priority={false}
          style={{
            width: '100%', 
            height: '100%',
            objectFit: 'cover',  // Ensures the image covers the div
          }}
        />
        <h1 className='absolute inset-3'>hellow</h1>
        <h1 className='absolute inset-7'>hellow12333</h1>
      </div>
    </div>

        </main>
        )
    }