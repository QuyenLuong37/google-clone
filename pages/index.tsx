import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import SearchInput from '../components/SearchInput'

const Home: NextPage = () => {
  
  return (
    <div className='grid grid-rows-[auto_1fr] h-full'>
      <Head>
        <title>Google</title>
        <meta name="description" content="Google clone by QL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className='p-3 px-4'>
        <div className="flex justify-end">
          <div className='space-x-4 flex items-center text-[#333]'>
            <div className='cursor-pointer hover:underline transition duration-200'>Gmail</div>
            <div className='cursor-pointer hover:underline transition duration-200'>Images</div>
            <div className='cursor-pointer hover:underline transition duration-200 w-10 h-10 rounded-full flex justify-center items-center hover:bg-[#f0f0f0]'>
              <svg focusable="false" className='w-6 fill-gray-600' viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
            </div>
            <Avatar />
          </div>
        </div>
      </header>

      {/* Body */}
      <form className='flex  items-center flex-col xl:mt-12 2xl:mt-32 space-y-6 flex-grow'>
         <div className="relative">
          <Image src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' objectFit='cover' width='272px' height='92px' alt='' />
         </div>

        <SearchInput />

        <div className='flex justify-center space-x-4'>
          <button className='py-2 px-4 cursor-pointer transition duration-200 hover:bg-gray-200 bg-gray-100 rounded text-sm'>Google Search</button>
          <button className='py-2 px-4 cursor-pointer transition duration-200 hover:bg-gray-200 bg-gray-100 rounded text-sm'>I&apos;m Feeling Lucky</button>
        </div>

        <div>
        Google offered in: <div className='inline-flex text-[#1a0dab] transition duration-200 hover:underline'>Tiếng việt</div>
        </div>
      </form>

      <Footer />
    </div>
  )
}

export default Home
