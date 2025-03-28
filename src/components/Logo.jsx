import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className='flex flex-wrap '>
      <div className='font-extrabold text-5xl text-red-800'>Twit</div>
      <div className='font-extrabold text-xl'>Blog</div>
    </div>
  )
}

export default Logo 