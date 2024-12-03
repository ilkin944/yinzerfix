import React from 'react'

export default function Badge({title}:{title:string}) {
  return (
    <div className='px-3 py-1 bg-yellow-500 font-semibold text-black '>{title}</div>
  )
}
