import React from 'react'

function Footer() {
  return (
    <div className='grid grid-rows-2 divide-y-2 bg-[#f2f2f2] text-[#70757a]'>
       <div className='py-4 px-8'>Vietnam</div>
       <div className='py-4 px-8'>
          <div className="flex justify-between">
             <div className="flex space-x-10">
                <div className='transition duration-200 hover:underline cursor-pointer'>About</div>
                <div className='transition duration-200 hover:underline cursor-pointer'>Advertising</div>
                <div className='transition duration-200 hover:underline cursor-pointer'>Business</div>
                <div className='transition duration-200 hover:underline cursor-pointer'>How Search works</div>
             </div>

             <div className="flex space-x-10">
                <div className='transition duration-200 hover:underline cursor-pointer'>Privacy</div>
                <div className='transition duration-200 hover:underline cursor-pointer'>Terms</div>
                <div className='transition duration-200 hover:underline cursor-pointer'>Settings</div>
             </div>
          </div>
       </div>
    </div>
  )
}

export default Footer