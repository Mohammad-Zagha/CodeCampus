'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/common/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <NavBar />
            {children}
         </body>
      </html>
   )
}
