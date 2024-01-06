'use client'

import {useState, useEffect, useRef} from 'react'



const Clock = () => {

  return (
  
    <div className="flex py-6 justify-center z-10">
      <div className="relative flex items-center justify-center rounded-full w-96 h-96 bg-red-600">
      {Array.from({length : 12}, (_,i) => i + 1).map((num) => (
        <label
          key={num}
          className={`absolute inset-5 text-3xl text-center z-20`}
          style={{ transform: `rotate(calc(${num}*(360deg/12)))` }}>
            <span 
                className={`inline-block`} 
                style={{ transform: `rotate(calc(${num}*(-360deg/12)))` }}
            >
              {num}
            </span>
          </label>
      ))}
      </div>
    </div>
    
 
  )
}



export default Clock