import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className='grid grid-rows-[auto_1fr]'>
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
            <Avatar url="https://lh3.googleusercontent.com/ogw/ADea4I58nPXFjlEkZ8C6wPwYr2DDX7g9isBEC4BO5VZb=s32-c-mo" />
          </div>
        </div>
      </header>

      {/* Body */}
      <form className='flex  items-center flex-col justify-center space-y-6 mt-52 flex-grow'>
          <Image src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' objectFit='cover' width='272px' height='92px' />

        <div className='flex items-center border py-[10px] px-3 rounded-full transition duration-200 focus-within:shadow-lg max-w-xl w-full mx-auto'>
          <svg className='w-5 fill-gray-400' focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>

          <input className='flex-grow outline-none px-2' type="text" />

          <svg className='w-6' focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"></path><path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path><path fill="#fbbc05" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"></path><path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"></path></svg>
        </div>

        <div className='flex justify-center space-x-4'>
          <button className='py-2 px-4 cursor-pointer transition duration-200 hover:bg-gray-200 bg-gray-100 rounded text-gray-700 text-sm'>Google Search</button>
          <button className='py-2 px-4 cursor-pointer transition duration-200 hover:bg-gray-200 bg-gray-100 rounded text-gray-700 text-sm'>I'm Feeling Lucky</button>
        </div>
      </form>

      <Footer />
    </div>
  )
}

export default Home
