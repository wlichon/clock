'use client'

import {useState, useEffect, useRef,} from 'react'

type Time = {
  hours: number,
  minutes: number,
  seconds: number
}

const Clock = () => {
  const [time, setTime] = useState(new Date().getTime())
  const [running, setRunning] = useState(true)
  const [future, setFuture] = useState(false)
  const intervalIds = useRef<NodeJS.Timeout[]>([])
  
  const [clock, setClock] = useState<Time>({hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    if(!running)
      return
    const intervalId = setInterval(() => { 
      setTime(curr => {
        const nextSecond = curr + 1000
        return nextSecond
      })
    }, 1000)
  
    return () => clearInterval(intervalId);
   
  }, [running])

  

  useEffect(() => {
    console.log(time)
    const date = new Date(time)
    setClock({hours: date.getHours(), minutes: date.getMinutes(), seconds : date.getSeconds()})
  }, [time]) 

  useEffect(() => {
    console.log(clock)
  }, [clock])

  useEffect(() => {
    console.log(running)
  }, [running])

  const timeTravel = async () => {
    const intervalId = setInterval(() => {
      setTime(curr => curr + 1000)
    }, 50)

    intervalIds.current.push(intervalId)
  };


  const cancelTimeTravel = () => {
    for(let id of intervalIds.current){
      clearInterval(id);
    }
  }

  const handleClock = (e : any) => {
    const input = e.target.value.match(/\d+/g)
    console.log(input)
  }

  const getFormat = () => {
    const hours = clock.hours.toString().padStart(2, '0');
    const minutes = clock.minutes.toString().padStart(2, '0');
    const seconds = clock.seconds.toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`;      
  }


  return (
  <div className = "flex justify-center">
      <div className="flex-row py-6">
        <div className="relative flex items-center justify-center rounded-full w-96 h-96 bg-gray-600">
          <div className="minute absolute overflow-hidden z-30"
          style={{ transform: `rotate(${clock.minutes*6}deg)` }}>
            <div className="relative w-1 h-[23rem] bg-white bottom-[11.5rem]">

            </div>

          </div>

          <div className="hour absolute overflow-hidden z-30"
          style={{ transform: `rotate(${clock.hours*30+(clock.minutes/6)*3}deg)` }}>
            <div className="relative w-1.5 h-[14rem] bg-black bottom-[7rem]">

            </div>

          </div>

          <div className="second absolute overflow-hidden z-30"
            style={{ transform: `rotate(${clock.seconds*6}deg)` }}
          >
            <div className="relative w-0.5 h-[22rem] bg-red-600 bottom-[11rem]">

            </div>

          </div>
      
        {Array.from({length : 12}, (_,i) => i + 1).map((num) => (
          <label
            key={num}
            className={`absolute inset-0 text-3xl text-center z-20`}
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
        <div className="relative flex flex-col items-center">
          <button
          className="m-2 border-2 bg-slate-300 rounded z-50"
          type="button"
          onClick={() => setRunning(state => !state)}
          >
            {running ? "Stop" : "Start"}
          </button>

          <button
          className="m-2 border-2 bg-slate-300 rounded z-50"
          type="button"
          onClick={() => setTime(new Date().getTime())}
          >
            Reset
          </button>

          <button
          className="m-2 border-2 bg-slate-300 rounded z-50"
          type="button"
          onClick={() => {
            timeTravel()
            setFuture(true)
          }}
          
          >
            INTO THE FUTURE!!
          </button>

          {
            future &&
            <button
            className="m-2 border-2 bg-red-600 rounded z-50"
            type="button"
            onClick={() => { 
              cancelTimeTravel()
              setFuture(false)
            }
            
            }
            
            >
              SLOW DOWN!!
            </button>

          }

          <input onBlur={handleClock} value={getFormat()} />
        </div>
      </div>

      

    
    </div>
 
  )
}



export default Clock