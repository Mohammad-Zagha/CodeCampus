'use client'
import React from 'react'
import './node.css'
import dynamic from 'next/dynamic'
const WebGiViewer = dynamic(() => import('./_components/WebGiViewer'), { ssr: false })
const Page = () => {
   return (
      <div>
         <WebGiViewer />
      </div>
   )
}
export default Page
