'use client'
import React from 'react'
import { WobbleCard } from './ui/wobble-card'
import './RightGrid.css'
import { useRouter } from 'next/navigation'

const RightGrid = () => {
   const { push } = useRouter()
   const handleCardClick = () => {
      push('/nodejs')
   }

   return (
      <div className="h-full flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 ">
         {/* First WobbleCard that triggers the expansion animation */}
         <WobbleCard containerClassName="bg-[#FFDEB3] h-full" onClick={handleCardClick}>
            <h1>Click to Expand</h1>
         </WobbleCard>

         {/* Other cards */}
         <div className="flex h-full gap-4 max-md:flex-col">
            <WobbleCard containerClassName="bg-[#2C2C2C]">
               <h1></h1>
            </WobbleCard>
            <WobbleCard containerClassName="bg-[#0e0d0d]" enableNoise={false}>
               <h1></h1>
            </WobbleCard>
         </div>
      </div>
   )
}

export default RightGrid
