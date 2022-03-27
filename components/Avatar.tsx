import Image from 'next/image'
import React from 'react'

function Avatar() {
  return (
   <div className='relative w-8 h-8 cursor-pointer'>
      <Image className='rounded-full' src='https://lh3.googleusercontent.com/ogw/ADea4I58nPXFjlEkZ8C6wPwYr2DDX7g9isBEC4BO5VZb=s32-c-mo' layout='fill' alt='' />
   </div>
  )
}

export default Avatar