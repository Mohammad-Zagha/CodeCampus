'use client'
import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '../node.css'
import { cn } from '@/lib/utils'
// Register the MotionPathPlugin
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)
const nodeJsSentences = [
   { id: 1, sentence: 'Node.js is powerful.' },
   { id: 2, sentence: 'Fast and scalable' },
   { id: 3, sentence: 'Perfect for microservices.' },
   { id: 4, sentence: 'Non-blocking I/O model.' },
   { id: 5, sentence: 'Excellent for real-time.' },
   { id: 6, sentence: 'Ideal for event-driven apps.' },
   { id: 7, sentence: 'Uses JavaScript everywhere.' },
   { id: 8, sentence: 'Built for server-side apps.' },
   { id: 9, sentence: 'Enables high concurrency.' },
   { id: 10, sentence: 'Supports asynchronous programming.' },
   { id: 11, sentence: 'Perfect for web applications.' },
   { id: 12, sentence: 'Great for RESTful APIs.' },
   { id: 13, sentence: 'Highly efficient for I/O.' },
   { id: 14, sentence: 'Event-loop based execution.' },
   { id: 15, sentence: 'Full-stack JavaScript platform.' },
   { id: 16, sentence: 'Offers excellent performance.' },
   { id: 17, sentence: 'Easily handles high traffic.' },
   { id: 18, sentence: 'Lightweight and fast framework.' },
   { id: 19, sentence: 'Compatible with many databases.' },
   { id: 20, sentence: 'Easy to learn and use.' },
   { id: 21, sentence: 'Strong support for modules.' },
   { id: 22, sentence: 'Great for real-time applications.' },
   { id: 23, sentence: 'Handles multiple connections .' },
   { id: 24, sentence: 'Supports modern JavaScript features.' },
   { id: 25, sentence: 'Strong open-source community.' },
   { id: 26, sentence: 'Cross-platform application support.' },
   { id: 27, sentence: 'Simplifies server-side development.' },
   { id: 28, sentence: 'Vibrant ecosystem of packages.' },
   { id: 29, sentence: 'Seamless JSON handling.' },
   { id: 30, sentence: 'Popular for backend services.' },
   { id: 31, sentence: 'Enables fast prototyping.' },
   { id: 32, sentence: 'Scales effortlessly' },
   { id: 33, sentence: 'Efficient resource utilization.' },
   { id: 34, sentence: 'Supports clustering for scaling.' },
   { id: 35, sentence: 'Integrates well with front-end.' },
   { id: 36, sentence: 'Promotes code reusability.' },
   { id: 37, sentence: 'Handles asynchronous data requests.' },
   { id: 38, sentence: 'Reduces server response time.' },
   { id: 39, sentence: 'Highly customizable framework.' },
   { id: 40, sentence: 'Great for data-intensive apps.' },
   { id: 41, sentence: 'Perfect for chat applications.' },
   { id: 42, sentence: 'Provides fast data streaming.' },
   { id: 43, sentence: 'Uses single programming language.' },
   { id: 44, sentence: 'Supports serverless architecture.' },
   { id: 45, sentence: 'Strong corporate backing.' },
   { id: 46, sentence: 'Supports multiple frameworks.' },
   { id: 47, sentence: 'Great for API development.' },
   { id: 48, sentence: 'Handles concurrent requests smoothly.' },
   { id: 49, sentence: 'Highly adaptable platform.' },
   { id: 50, sentence: 'Efficient real-time web apps.' },
   { id: 51, sentence: 'Supports WebSocket communication.' },
   { id: 52, sentence: 'Best for single-page applications.' },
   { id: 53, sentence: 'Handles load balancing easily.' },
   { id: 54, sentence: 'Uses event-driven architecture.' },
   { id: 55, sentence: 'Supports NoSQL databases well.' },
   { id: 56, sentence: 'Compatible with cloud environments.' },
   { id: 57, sentence: 'High availability under load.' },
   { id: 58, sentence: 'Ideal for microservice architecture.' },
   { id: 59, sentence: 'Manages asynchronous tasks .' },
   { id: 60, sentence: 'Great support for automation.' },
]
const Slider = () => {
   const tl = gsap.timeline({ paused: true })

   function updatePosition() {
      const radius = 1200
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const angleIncrement = (2 * Math.PI) / nodeJsSentences.length
      const scrollAmount = window.scrollY * -0.001 // Adjust the scroll factor

      document.querySelectorAll('.item').forEach((item, index) => {
         const angle = index * angleIncrement + scrollAmount
         const x = centerX + radius * Math.cos(angle)
         const y = centerY + radius * Math.sin(angle)
         const rotation = (angle * 180) / Math.PI

         gsap.to(item, {
            x: x + 'px',
            y: y + 'px',
            rotation: rotation,
            duration: 0.5,
            ease: 'power2.out',
         })
      })

      const scrollThreshold = 800
      if (window.scrollY >= scrollThreshold) {
         tl.play()
      } else if (window.scrollY <= scrollThreshold) {
         tl.reverse()
      }
   }

   useEffect(() => {
      const radius = 1200
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const angleIncrement = (2 * Math.PI) / nodeJsSentences.length

      nodeJsSentences.forEach((sentence, index) => {
         const angle = index * angleIncrement
         const x = centerX + radius * Math.cos(angle)
         const y = centerY + radius * Math.sin(angle)
         const rotation = (angle * 180) / Math.PI

         gsap.set(`#item-${sentence.id}`, {
            x: x + 'px',
            y: y + 'px',
            rotation: rotation,
         })
      })
      tl.to('#container', {
         left: '-75%',
         duration: 0.5,
         ease: 'power2.out',
      })
      updatePosition()
      window.addEventListener('scroll', updatePosition)

      return () => {
         window.removeEventListener('scroll', updatePosition)
      }
   }, [])

   return (
      <div className=" w-screen h-[800vh] bg-black">
         <div className={`gallery fixed w-[200%] -left-[150%] top-0`} id="container">
            {nodeJsSentences.map((sentence) => (
               <div id={`item-${sentence.id}`} className={cn('item')} key={sentence.id}>
                  {/* Use Tailwind CSS for styling */}
                  <p className="font-bold">{sentence.sentence}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Slider
