/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react'

function SearchResultItemImage({link, title, image}: any) {
    const router = useRouter();
  return (
    <div onClick={() => image?.contextLink ? router.push(image?.contextLink as string, {}) : null} className='flex flex-col rounded  max-h-52 cursor-pointer'>
        <img className='object-cover w-full max-h-32 rounded' src={link}  alt='' />
        <div className="flex flex-col justify-end flex-grow ">
            <div className='line-clamp-1 text-[11px] text-gray-500 mb-1'>{title}</div>
            <div className='line-clamp-1 text-[11px] text-gray-500'>{image?.contextLink}</div>
        </div>
    </div>
  )
}

export default SearchResultItemImage