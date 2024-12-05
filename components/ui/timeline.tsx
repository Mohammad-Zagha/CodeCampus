import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface TimelineEntry {
   title: string
   content: React.ReactNode
   dir?: string
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
   const ref = useRef<HTMLDivElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [height, setHeight] = useState(0)

   useEffect(() => {
      if (ref.current) {
         const rect = ref.current.getBoundingClientRect()
         setHeight(rect.height)
      }
   }, [ref])

   const { scrollYProgress } = useScroll({
      target: containerRef.current ? (containerRef as React.RefObject<HTMLElement>) : undefined,
      offset: ['start 10%', 'end 50%'],
   })

   const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
   const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

   return (
      <div className="w-full bg-black font-sans md:px-5" ref={containerRef}>
         <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
            {data.map((item, index) => (
               <motion.div
                  key={index}
                  className="flex justify-start pt-10 md:pt-40 md:gap-10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.2 }} // Trigger animation only once, with 20% of the item in view
               >
                  <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                     <h3 className="hidden font-arabic md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
                        {item.title}
                     </h3>
                  </div>

                  <motion.div
                     className="relative pl-20 pr-4 md:pl-4 w-full font-arabic"
                     initial="hidden"
                     whileInView="visible"
                     variants={{
                        visible: { transition: { staggerChildren: 0.2 } },
                        hidden: {},
                     }}
                     viewport={{ once: true }}
                  >
                     <motion.h3
                        className="md:hidden block text-2xl mb-4 text-right font-bold text-neutral-500"
                        variants={{
                           hidden: { opacity: 0, y: 20 },
                           visible: { opacity: 1, y: 0 },
                        }}
                     >
                        {item.title}
                     </motion.h3>
                     <motion.div
                        variants={{
                           hidden: { opacity: 0, y: 20 },
                           visible: { opacity: 1, y: 0 },
                        }}
                     >
                        {item.content}
                     </motion.div>
                  </motion.div>
               </motion.div>
            ))}
            <div
               style={{
                  height: height + 'px',
               }}
               className="absolute md:-right-4 right-0 top-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
            >
               <motion.div
                  style={{
                     height: heightTransform,
                     opacity: opacityTransform,
                  }}
                  className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
               />
            </div>
         </div>
      </div>
   )
}
