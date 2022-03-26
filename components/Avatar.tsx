import Image from 'next/image'
import React from 'react'

function Avatar({url}: any) {
  return (
   <div className='relative w-8 h-8 cursor-pointer'>
      <Image className='rounded-full' src={url} layout='fill' />
   </div>
  )
}

export default Avatar