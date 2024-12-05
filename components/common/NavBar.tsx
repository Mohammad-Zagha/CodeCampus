'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './NavBar.css'

const menuLinks = [
   { title: 'Home', href: '/' },
   { title: 'Next Js', href: '/nextjs' },
   { title: 'React Js', href: '/reactjs' },
   { title: 'ASP .NET', href: '/aspnet' },
   { title: 'Node Js', href: '/nodejs' },
]

const NavBar = () => {
   const container = useRef(null)
   const [open, setOpen] = React.useState(false)
   const tl = useRef<gsap.core.Timeline | null>(null)

   const toggleMenu = () => {
      setOpen(!open)
   }

   useGSAP(
      () => {
         gsap.set('.menu-link-item-holder', { y: 90 })
         tl.current = gsap
            .timeline({ paused: true })
            .to('.menu-overlay', {
               x: 0,
               duration: 1,
               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
               ease: 'power4.inOut',
            })
            .to('.menu-link-item-holder', { y: 0, duration: 0.5, stagger: 0.1, ease: 'power4.out', delay: -0.75 })
      },
      { scope: container },
   )

   useEffect(() => {
      if (open) {
         tl.current?.play()
      } else {
         tl.current?.reverse()
      }
   }, [open])

   return (
      <div ref={container} className="">
         {/* menu bar */}
         <div className="fixed top-0 left-0 w-screen p-8 flex justify-between items-center z-50">
            <Link href="/" className="text-white">
               CODE CAMPUS
            </Link>
            <div>
               <button onClick={toggleMenu}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="#FFFFFF"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
               </button>
            </div>
         </div>

         {/* menu overlay */}
         <div className="menu-overlay fixed top-0 left-0 bottom-0 z-20 w-screen bg-[#FFDEB3]">
            <div className="p-8 flex justify-between items-center">
               <Link href="/" className="text-black font-semibold">
                  CODE CAMPUS
               </Link>
               <div>
                  <button onClick={toggleMenu}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                     </svg>
                  </button>
               </div>
            </div>
            <div className="flex h-[80%] max-md:h-[75%] w-full md:w-2/3 justify-center ">
               {/* Menu content area */}
               <div className="flex flex-col h-full menu-links">
                  {menuLinks.map((link) => (
                     <div className="menu-link-item" key={link.title}>
                        <div className="w-fit menu-link-item-holder">
                           <Link href={link.href} className="text-black text-6xl font-medium my-4">
                              {link.title}
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="  flex w-full justify-between px-10 items-center">
               <button onClick={toggleMenu} className="">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="100" // increased size
                     height="100" // increased size
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="#000000"
                     strokeWidth="1"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
               </button>
               <div className="flex flex-col">
                  <a href="https://www.facebook.com" className="text-black  font-medium ">
                     Facebook
                  </a>
                  <a href="https://www.twitter.com" className="text-black  font-medium ">
                     Twitter
                  </a>
                  <a href="https://www.instagram.com" className="text-black  font-medium ">
                     Instagram
                  </a>
               </div>
               <div className="flex flex-col">
                  <p>info@codecampus.com</p>
                  <p>+972569749022</p>
               </div>
               <div className="">Code Campus</div>
            </div>
         </div>
      </div>
   )
}

export default NavBar
