import Clock from '@/components/Clock'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <p className="desc text-center">
            Analog Clock
        </p>

        <Clock/>
        
    </section>
  )
}
